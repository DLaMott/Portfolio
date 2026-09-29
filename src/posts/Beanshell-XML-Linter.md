## Creating a Pipeline BeanShell Parser

If you have ever worked on SailPoint IdentityIQ, you know the feeling. You write a rule, export it, deploy it, and only then find out you left a stray parenthesis in the middle of it. Nothing complained along the way. Nothing could, because nothing was looking.

This post is about the tool we built to fix that: a small command line linter that reads the BeanShell hiding inside IIQ XML files and fails the pipeline when something is broken or risky. It is open source at [Beanshell-XML-Linter](https://github.com/DLaMott/Beanshell-XML-Linter). I am not going to walk through building it line by line. Instead I want to cover why it exists, how it works, what it does, and just as important, what it does not do.

## Why We Built It

In IdentityIQ a lot of real logic lives as BeanShell inside XML. Rules, workflow steps and forms all carry code in `<Source>` blocks, and that code gets versioned and deployed like any other config file.

That is where the trouble starts:

* A syntax error usually is not found until the rule actually runs in an environment.
* A normal CI pipeline treats those XML files as opaque text. It has no idea there is code inside.
* Java linters and security scanners do not understand the format, so the same mistakes keep coming back. Empty catch blocks, credentials pasted into a rule, LDAP filters glued together with string concatenation.

We looked for something that already did this and did not find it. So the goal became simple: run one command locally or in CI, and stop bad BeanShell before it reaches a real system.

## What It Looks Like

Here is a small rule I put together with a few classic problems in it:

```xml
<Rule language="beanshell" name="Demo Rule" type="BuildMap">
    <Source>
    String password = "hunter2";
    // TODO: move this out of the rule
    String filter = "(uid=" + userName + ")";
    try {
        Object result = context.search(filter);
    } catch (Exception e) {
    }
    </Source>
</Rule>
```

And this is what the linter says about it:

```text
demo.xml:5: [WARNING] [hardcoded-secret] Possible hardcoded credential assigned to 'password'
demo.xml:6: [WARNING] [todo-fixme-comment] Leftover TODO comment
demo.xml:7: [WARNING] [ldap-injection-risk] Possible LDAP filter/DN built via string concatenation; escape input or use a parameterized filter API instead
demo.xml:10: [WARNING] [empty-catch-block] Empty catch block silently swallows exceptions
demo.xml:10: [WARNING] [broad-catch] Catching Exception is overly broad; catch a narrower type

0 error(s), 5 warning(s) across 1 file(s) scanned
```

Notice the line numbers. They are the line numbers in the XML file, not in the extracted script, so you can jump straight to the problem in your editor.

Syntax problems are treated more seriously. Here is a rule with `if (x == )` in it:

```text
known-bad-syntax-error.xml:16: [ERROR] [bsh-syntax-error] Encountered ")" at line 5, column 14.

1 error(s), 1 warning(s) across 1 file(s) scanned
```

An ERROR makes the process exit with a non-zero code, which is exactly what a pipeline needs to fail the build.

## How It Works

Every file goes through the same short pipeline.

![Diagram of the linter pipeline: extract, syntax check, mask, lint rules, report](/blog/beanshell-linter-pipeline.svg)

**1. Extract.** The XML is parsed and every `<Source>` block is pulled out with its position in the file. If the XML is not even well formed, that is reported right away as an error. One small detail here: IIQ files reference a `sailpoint.dtd` that cannot be resolved, so a custom entity resolver hands back an empty document instead of letting the parser go looking for it on the network and hang your CI job.

**2. Syntax check.** Each block goes through the real BeanShell parser, not a lookalike grammar we wrote ourselves. If BeanShell would reject it, so do we. If BeanShell accepts it, so do we.

**3. Mask.** This is my favorite part because it is so simple. Before any rule runs, the contents of comments and string literals are replaced with spaces. The length and the newlines stay the same, so line numbers do not move.

![Before and after masking of a snippet, showing comment and string contents blanked out](/blog/beanshell-linter-masking.svg)

Why bother? Because a regex looking for `.printStackTrace(` should not fire on a string that happens to contain those characters, or on a comment. Masking removes a whole class of false positives before the rules even start.

**4. Run the rules.** There are 19 built in rules, and each one is a tiny class. Here is the real one for `printStackTrace`:

```java
public final class PrintStackTraceRule implements LintRule {

    private static final Pattern PATTERN = Pattern.compile("\\.printStackTrace\\s*\\(");

    @Override
    public String id() {
        return "print-stack-trace";
    }

    @Override
    public Severity defaultSeverity() {
        return Severity.WARNING;
    }

    @Override
    public List<Finding> check(SourceBlock block, MaskResult masked) {
        List<Finding> findings = new ArrayList<>();
        Matcher matcher = PATTERN.matcher(masked.masked());
        while (matcher.find()) {
            int localLine = LineIndex.lineAt(masked.masked(), matcher.start());
            int fileLine = LineMapper.mapLine(block.startLine(), localLine);
            findings.add(new Finding(block.filePath(), fileLine, defaultSeverity(), id(),
                    "printStackTrace() writes to stderr instead of the IIQ logger"));
        }
        return findings;
    }
}
```

That is the whole rule. Match a pattern against the masked text, map the position back to a real line, return a finding.

**5. Report.** Findings are sorted and printed, and the exit code tells the pipeline what to do. Any ERROR fails the build. Warnings only fail it if you pass `--fail-on-warning`.

## What It Checks

**Syntax.** Every `<Source>` block, using the actual BeanShell parser.

**Style and anti patterns:**

* Empty catch blocks
* Catching `Exception` or `Throwable`
* `System.exit()` calls
* Apparent hardcoded credentials
* Leftover TODO and FIXME comments
* Bare `printStackTrace()` calls
* Wildcard imports

**Security patterns, each mapped to a CWE:**

* Weak crypto (MD5, DES, bare AES): CWE-327
* `java.util.Random` instead of `SecureRandom`: CWE-330
* Unguarded Java deserialization: CWE-502
* Disabled TLS certificate or hostname checks: CWE-295
* OS command execution: CWE-78
* XML parsing without XXE protection: CWE-611
* Logging values that look sensitive: CWE-532
* SQL or LDAP built by string concatenation: CWE-89 and CWE-90
* File paths built by string concatenation: CWE-22
* URLs built from a variable: CWE-918
* Non-constant `Class.forName()` arguments: CWE-470

## What It Does Not Do

I think this section matters more than the one above it, so here it is plainly.

**It is not taint analysis.** Every rule is a regex over masked text. A rule saying "LDAP filter built by concatenation" means the risky construct is present, not that it is provably exploitable from user input. This is the same tradeoff Semgrep and gosec make, and it is a different thing from a tool like SonarQube that resolves symbols and follows data. Treat findings as things to look at, not as proven vulnerabilities.

**It does not find CVEs.** It catches the code patterns behind common vulnerability classes, but a CVE is a specific vulnerable version of a specific dependency. A source only linter cannot see what is on your classpath. That job belongs to a software composition analysis tool.

**The parser is old.** BeanShell 2.1.1 is the newest version with an official pre built release, and it cannot parse the diamond operator (`new ArrayList<>()`), nested generics (`Map<String, List<String>>`) or try with resources. If your rules use those, you will get a false positive syntax error. That is a real gap in the wider BeanShell ecosystem and we documented it instead of hiding it.

**It only checks BeanShell.** IIQ rules can set a `language` attribute to pick a different script engine. If it is anything other than `beanshell`, the whole file is skipped, so we never produce nonsense findings by running BeanShell checks on someone's PowerShell.

We also tried an `unused-import` rule and removed it. BeanShell rules constantly use IIQ classes without a literal token a text match could find, so it produced far too much noise on real exports. Some checks are better left out than done badly.

## What We Added Along the Way

The core loop of parse, mask and match came together quickly. Most of the effort went into making it pleasant to live with in a real pipeline.

**Suppressing on purpose.** Sometimes a warning is intentional, like a fake credential in a test fixture. You can turn a rule off for the whole run with `--disable`, or silence a single line the same way you would with ESLint:

```java
// lint-disable-next-line hardcoded-secret
String password = "intentionally-fake-for-this-test";

String password2 = "also-fake"; // lint-disable-line hardcoded-secret
```

**Only what changed.** On a big repo you do not want to rescan every rule on every merge request:

```bash
java -jar beanshell-xml-linter.jar Config/ --changed-since origin/main
```

**Several directories at once.** Pass as many paths as you like, they are searched recursively and deduplicated:

```bash
java -jar beanshell-xml-linter.jar Config/ _certs/ _config/ --fail-on-warning
```

**Docker.** For teams that would rather not install Java and Maven:

```bash
docker build -t beanshell-xml-linter .
docker run --rm -v "$(pwd)/examples:/workspace" beanshell-xml-linter /workspace
```

**Pipeline templates.** There is a ready to adapt GitHub Actions workflow and GitLab config. A release workflow also publishes the jar to GitHub Releases on every version tag, so your pipeline can download it with a single `curl` and run it on a plain JRE. No registry needed.

**A vendored parser.** The BeanShell jar lives in the repo, so builds do not depend on an external artifact staying available.

**Real tests.** Unit tests for each rule, plus end to end tests against real SailPoint XML fixtures.

## Adding Your Own Rule

Because each rule is one small class, extending it is easy. Implement `LintRule`, match against the masked text, and register it in `RuleRegistry.BUILTIN_RULES`. That is all it takes to show up in the output and to work with `--disable`.

A few conventions we stuck to. Rule ids are kebab case and stable, since people put them in `--disable` flags and suppression comments. Only syntax and XML problems are ERRORs. Everything else is a WARNING.

## A Note on Scoping

One thing that catches people out: point the linter at your rule directories, not at the repo root. It treats every `*.xml` file it finds as fair game, and an XML file that is not well formed is always an error. Aim it at a whole repo and some unrelated build config in a corner will fail your lint gate with a confusing message about a file you never meant to check.

## Try It

Grab the jar from the [releases page](https://github.com/DLaMott/Beanshell-XML-Linter/releases) or build it yourself:

```bash
mvn -B package
java -jar target/beanshell-xml-linter.jar path/to/rules/
```

If you write IIQ rules and hit a false positive, or think of a rule worth adding, open an issue. The source, examples and CI configs are all at [github.com/DLaMott/Beanshell-XML-Linter](https://github.com/DLaMott/Beanshell-XML-Linter).

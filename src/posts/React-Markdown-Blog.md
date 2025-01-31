## Building A Dynamic React Blog
In this blog post, I’ll walk you through the process of building a simple React blog with a few cool features: syntax-highlighted code blocks, a dynamic blog post loader, and a fun particle animation background. By the end of this tutorial, you’ll have a modern blog with a visually engaging design and some useful interactivity.

## The Goal
The goal was to create a blog with the following features:

1. A homepage displaying blog post summaries with titles and dates.
2. A detail page for each post that loads markdown content dynamically.
3. A stylish background that adds movement without distracting from the content.
4. Code blocks inside posts that are syntax-highlighted for readability.
Let's break it down step by step!

## Setting Up Dependencies
Before diving into the code, let’s quickly look at the libraries that helped us achieve all of this:

- React: This is our UI library for building the app.
- React Router: To handle navigation between the homepage and individual posts.
- React-Bootstrap: This makes it easier to lay out the page using pre-built Bootstrap components.
- react-markdown: This is the library we use to render markdown content.
- remark-gfm: A plugin that helps us parse GitHub Flavored Markdown (GFM), which allows things like tables, task lists, etc.
- react-syntax-highlighter: This is used for syntax highlighting in code blocks within our markdown files.
- Particles.js: This adds a cool particle animation effect in the background.
Now, let’s dive into how we built the blog step by step!

## 1. Setting Up the Blog Overview Page
Our blog’s homepage needed to display a list of blog posts with titles, dates, and links to individual post pages. To make it engaging, we used a background particle effect with the Particle component.

Here’s how we structured the homepage:

### The Layout
We used React-Bootstrap's grid system to center the content on the page and create a responsive layout. The homepage includes:

- A heading welcoming users to the blog.
- A list of blog posts, each showing the title, publication date, and a link to the full post.


```javascript

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    import(`../../posts/${slug}.md`)
      .then((res) => fetch(res.default))
      .then((response) => response.text())
      .then((text) => {
        console.log("Markdown content loaded: ", text);
        setContent(text);
      })
      .catch((err) => console.error("Error fetching markdown file:", err));
  }, [slug]);

  // Custom renderer for code blocks
  const renderers = {
    code({ children, className, node, ...rest }) {

      const match = /language-(\w+)/.exec(className || '');
      if (match) {
        console.log("Code Block Detected: Language =", match[1], "Value =", children);
        return (
          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            language={match[1]}
            style={coy}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      } else {
        console.log("No specific language, defaulting to <code>:", children);
        return <code {...rest}>{children}</code>;
      }
    },
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Particles positioned behind everything */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Particle />
      </div>

      {/* Blog post content */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          width: "66.6%",
          margin: "0 auto",
          padding: "50px 20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          zIndex: 1,
        }}
      >
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={8}
              style={{
                textAlign: "center",
                paddingBottom: "30px",
              }}
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                Blog Post: <strong className="purple">{slug.replace("-", " ")}</strong>
              </h1>
            </Col>
          </Row>

          <Row>
            <Col md={8} style={{ margin: "0 auto" }}>
              <div
                style={{
                  backgroundColor: "#e8e8e8",
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  textAlign: "justify",
                  fontSize: "1.1em",
                  margin: "0 auto",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={renderers}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BlogPost;
```

### Sorting the Posts
To ensure the most recent posts show up first, we sorted the posts by their publication date. This was done easily with JavaScript's Date object, so the posts are displayed in descending order:

```javascript
const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
```

The blog post data includes an ID, title, slug (for routing), and date.

## 2. Displaying the Full Post
When a user clicks on a post, we navigate to a new page where the full post is displayed. We used React Router to handle this navigation.

The post content is loaded dynamically from markdown files using react-markdown. The markdown content is fetched based on the slug of the post, which is passed in the URL.


### Custom Code Block Rendering
Since we wanted syntax highlighting for code blocks, we integrated react-syntax-highlighter. This library automatically highlights code inside the markdown posts.

```javascript

const renderers = {
  code({ children, className, node, ...rest }) {
    const match = /language-(\w+)/.exec(className || "");
    if (match) {
      return (
        <SyntaxHighlighter {...rest} language={match[1]} style={nord}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }
    return <code {...rest}>{children}</code>;
  },
};
```

We passed this custom renderer to the ReactMarkdown component to ensure code blocks are rendered with syntax highlighting.

## 3. Adding the Particle Background
One fun feature we added was a dynamic particle animation background. This makes the site feel more interactive and lively. We used a custom Particle component that renders the animation behind all the content.

```javascript

<div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
  <Particle />
</div>
```

By placing it with a lower zIndex, we ensured the particles moved in the background while keeping the text and other content clear and readable.

## 4. Wrapping Up
And that's it! We now have a fully functional React blog with a clean layout, dynamic content loading, and some cool extras like syntax-highlighted code blocks and a particle background. Here’s a recap of what we achieved:

- Dynamic Blog Post Loading: Posts are loaded dynamically based on their slug, allowing us to easily add new content.
- Syntax Highlighting: Code snippets within the markdown are properly highlighted using react-syntax-highlighter.
- Particle Background: A subtle but engaging particle effect adds some dynamic visuals to the page without distracting from the content.
That’s the walkthrough of building a dynamic React blog with markdown support. I hope this post gave you a good understanding of how we used React and several libraries to create a functional and stylish blog.

You can find the blog portion of the code [here](https://github.com/DLaMott/Portfolio/tree/master/src/components/Blog) and the posts [here](https://github.com/DLaMott/Portfolio/tree/master/src/posts).
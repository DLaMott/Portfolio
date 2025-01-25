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

1. Setting Up the Blog Overview Page
Our blog’s homepage needed to display a list of blog posts with titles, dates, and links to individual post pages. To make it engaging, we used a background particle effect with the Particle component.

Here’s how we structured the homepage:

### The Layout
We used React-Bootstrap's grid system to center the content on the page and create a responsive layout. The homepage includes:

- A heading welcoming users to the blog.
- A list of blog posts, each showing the title, publication date, and a link to the full post.


```jsx

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { Link } from "react-router-dom";

const Blog = () => {
  const posts = [
    { id: 3, title: "Building a react markdown blog", slug: "reactBlog", date: "2025-01-25" },
    { id: 1, title: "Mapping performance with TimedLdapTemplate", slug: "timedLdapTemplate", date: "2025-01-02" },
    { id: 2, title: "Building a react express Ldap Viewer", slug: "ldapViewer", date: "2025-01-20" },
  ];

  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

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
          zIndex: 0, // Send particles to the back
        }}
      >
        <Particle />
      </div>

      {/* Blog content */}
      <div
        style={{
          position: "relative", // Ensures this is above particles
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          width: "66.6%",
          margin: "0 auto",
          padding: "50px 20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          zIndex: 1, // Content above particles
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
                Welcome to My <strong className="purple">Blog</strong>
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={8} style={{ margin: "0 auto" }}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {sortedPosts.map((post) => (
                  <li
                    key={post.id}
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Post Date */}
                    <div
                      style={{
                        fontSize: "1.2em",  // Match the font size of other text
                        color: "#333",      // Darker text for better readability
                        fontWeight: "600",  // Slightly bold for emphasis
                        marginBottom: "10px",
                        fontFamily: "Arial, sans-serif", // Match the font style with other text
                      }}
                    >
                      {new Date(post.date).toLocaleDateString()}
                    </div>

                    {/* Post Title Button */}
                    <Link
                      to={`/blog/${post.slug}`}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "15px 20px",
                        textAlign: "center",
                        backgroundColor: "#6c63ff",
                        color: "#fff",  // White text for better contrast
                        textDecoration: "none",
                        fontSize: "1.2em",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        transition: "transform 0.2s, background-color 0.2s",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#4f48c4")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#6c63ff")
                      }
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Blog;
```

### Sorting the Posts
To ensure the most recent posts show up first, we sorted the posts by their publication date. This was done easily with JavaScript's Date object, so the posts are displayed in descending order:

```js
const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
```

The blog post data includes an ID, title, slug (for routing), and date.

2. Displaying the Full Post
When a user clicks on a post, we navigate to a new page where the full post is displayed. We used React Router to handle this navigation.

The post content is loaded dynamically from markdown files using react-markdown. The markdown content is fetched based on the slug of the post, which is passed in the URL.

Here’s how we set up the post page:

```jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    import(`../../posts/${slug}.md`)
      .then((res) => fetch(res.default))
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Error fetching markdown file:", err));
  }, [slug]);

  return (
    <div>
      <h1>Blog Post: {slug.replace("-", " ")}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogPost;
```

### Custom Code Block Rendering
Since we wanted syntax highlighting for code blocks, we integrated react-syntax-highlighter. This library automatically highlights code inside the markdown posts.

```jsx

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

3. Adding the Particle Background
One fun feature we added was a dynamic particle animation background. This makes the site feel more interactive and lively. We used a custom Particle component that renders the animation behind all the content.

```jsx

<div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
  <Particle />
</div>
```

By placing it with a lower zIndex, we ensured the particles moved in the background while keeping the text and other content clear and readable.

4. Wrapping Up
And that's it! We now have a fully functional React blog with a clean layout, dynamic content loading, and some cool extras like syntax-highlighted code blocks and a particle background. Here’s a recap of what we achieved:

- Dynamic Blog Post Loading: Posts are loaded dynamically based on their slug, allowing us to easily add new content.
- Syntax Highlighting: Code snippets within the markdown are properly highlighted using react-syntax-highlighter.
- Particle Background: A subtle but engaging particle effect adds some dynamic visuals to the page without distracting from the content.
That’s the walkthrough of building a dynamic React blog with markdown support. I hope this post gave you a good understanding of how we used React and several libraries to create a functional and stylish blog.

You can find the blog portion of the code [here](https://github.com/DLaMott/Portfolio/tree/master/src/components/Blog) and the posts [here](https://github.com/DLaMott/Portfolio/tree/master/src/posts).
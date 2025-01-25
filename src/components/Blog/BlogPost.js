import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {nord} from "react-syntax-highlighter/dist/esm/styles/hljs";


const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    import(`../../posts/${slug}.md`)
      .then((res) => fetch(res.default))
      .then((response) => response.text())
      .then((text) => {
        console.log("Markdown content loaded: ", text); // Log the content of the markdown
        setContent(text);
      })
      .catch((err) => console.error("Error fetching markdown file:", err));
  }, [slug]);

  // Custom renderer for code blocks
  const renderers = {
    code({ children, className, node, ...rest }) {
      console.log("Code Block Detected:", { children, className, node });

      // Check if there's a language defined in the className
      const match = /language-(\w+)/.exec(className || '');
      if (match) {
        console.log("Code Block Detected: Language =", match[1], "Value =", children);
        return (
          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            language={match[1]} // Use the language identified
            style={nord}
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
          zIndex: 0, // Send particles to the back
        }}
      >
        <Particle />
      </div>

      {/* Blog post content */}
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
                Blog Post: <strong className="purple">{slug.replace("-", " ")}</strong>
              </h1>
            </Col>
          </Row>

          {/* Content with light grey background and shadow */}
          <Row>
            <Col md={8} style={{ margin: "0 auto" }}>
              <div
                style={{
                  backgroundColor: "#e8e8e8", // Light grey background
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
                  components={renderers} // Using custom renderer for code blocks
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
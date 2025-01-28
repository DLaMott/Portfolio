import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle"; // Optional background particles
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    import(`../../posts/${slug}.md`)
      .then((res) => fetch(res.default))
      .then((response) => response.text())
      .then((text) => {
 
        setContent(text);
      })
      .catch((err) => console.error("Error fetching markdown file:", err));
  }, [slug]);

  // Custom renderer for code blocks
  const renderers = {
    code({ children, className, node, ...rest }) {

      const match = /language-(\w+)/.exec(className || '');
      if (match) {
        return (
          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            language={match[1]}
            style={atomDark}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      } else {
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
      <div className="blog-post-content" 
        style={{
          position: "relative",
          minHeight: "100vh",
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
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px", marginTop: "80px" , color: "white"}}>
                Blog Post: <strong className="purple">{slug.replace("-", " ")}</strong>
              </h1>
            </Col>
          </Row>

          {/* Content with light grey background and shadow */}
          <Row>
            <Col md={8} style={{ margin: "0 auto" }}>
              <div
                style={{
                  backgroundColor: "#333", // Light grey background
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  textAlign: "justify",
                  fontSize: "1.1em",
                  margin: "0 auto",
                   color: "white"
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
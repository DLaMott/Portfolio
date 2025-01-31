import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { Link } from "react-router-dom";

const Blog = () => {
  const posts = [
    { id: 3, title: "Building a react markdown blog", slug: "React-Markdown-Blog", date: "2025-01-25" },
    { id: 1, title: "Mapping performance with a Timed LdapTemplate", slug: "Timed-Ldap-Template", date: "2025-01-02" },
    { id: 2, title: "Building a react express Ldap Viewer", slug: "Ldap-Directory-Viewer", date: "2025-01-20" },
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
          backgroundColor: "#333",
          minHeight: "100vh",
          width: "100%", // Ensure full width on mobile
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
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px", marginTop: "80px", color: "white" }}>
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
                        color: "white",      // Darker text for better readability
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

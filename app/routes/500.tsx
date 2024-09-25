import React from "react";

const Error500: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>500 - Server Error</h1>
      <p style={styles.message}>Something went wrong on our end. Please try again later.</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center" as const,
    backgroundColor: "#f8d7da",
    color: "#721c24"
  },
  header: {
    fontSize: "3rem",
    marginBottom: "1rem"
  },
  message: {
    fontSize: "1.5rem"
  }
};

export default Error500;

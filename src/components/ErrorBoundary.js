import { Container, Typography } from "@mui/material";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Typography variant="h6" color="error">
            Something went wrong
          </Typography>
          <Typography variant="body2">{this.state.error?.message}</Typography>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

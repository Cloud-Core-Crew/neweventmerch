import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can log error info here
  }
  render() {
    if (this.state.hasError) {
      return <h2 style={{ color: '#e50914', textAlign: 'center', marginTop: '2rem' }}>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

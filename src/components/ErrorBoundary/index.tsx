import { Component } from 'react';

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children?: React.ReactNode; // Define children as optional
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }
  
      return this.props.children;
    }
}

export default ErrorBoundary;
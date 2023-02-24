import React, { ErrorInfo } from "react";

import { SmallGenericError } from "metabase/containers/ErrorPages";

export default class ErrorBoundary extends React.Component<
  {
    onError?: (errorInfo: ErrorInfo) => void;
  },
  {
    hasError: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // if we don't provide a specific onError action, the component will display a generic error message
    if (this.props.onError) {
      this.props.onError(errorInfo);
      this.setState({
        hasError: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <SmallGenericError />;
    }

    return this.props.children;
  }
}

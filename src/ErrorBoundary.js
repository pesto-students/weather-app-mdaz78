import React, { Component } from 'react';
import Error from './components/error/Error';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log('called');
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <Error message='Something went wrong, please retry!' />;
    }
    return this.props.children;
  }
}

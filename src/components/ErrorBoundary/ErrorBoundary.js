import Button from 'react-bootstrap/Button';
import React from "react";
import BsFillBagXFill from "react-icons/bs"

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log("error", error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
        <>
            <div className='col-lg-12 text-center'>
            <h1>Something went wrong !</h1>
            <Button variant="primary" onClick={()=> window.location.reload()}>Reload</Button>
            </div>
        </>
        )
      }
      return <>{this.props.children}</>
    }
  }
import React, { Component } from "react";

import demos from "./demos";

class App extends Component {
  state = {
    currentIndex: 0,
    component: null
  };

  componentDidMount(): void {
    this._isMounted = true;
    const { currentIndex } = this.state;

    demos[currentIndex].component().then(({ default: component }) => {
      if (this._isMounted) {
        this.setState({ component });
      }
    });
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  render() {
    const { component: DemoComponent } = this.state;

    return (
      <div>
        <h1>
          Demos <code>react-quick-pinch-zoom</code>
        </h1>

        {DemoComponent ? <DemoComponent /> : null}
      </div>
    );
  }
}

export default App;

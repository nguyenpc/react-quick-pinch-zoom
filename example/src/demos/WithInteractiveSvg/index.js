import React, { Component, createRef } from "react";

import QuickPinchZoom, {
  make2dTransformValue,
  make3dTransformValue,
  hasTranslate3DSupport
} from "react-quick-pinch-zoom";

import { Belarus } from "./map";

const isSafari = /^((?!chrome|android).)*safari/i.test(
  window.navigator.userAgent
);

const use3DTransform = hasTranslate3DSupport() && !isSafari;

const makeTransformValue = use3DTransform
  ? make3dTransformValue
  : make2dTransformValue;

class WIthImage extends Component {
  innerRef = createRef();

  onUpdate = ({ x, y, scale }) => {
    const { current: div } = this.innerRef;

    if (div) {
      div.style.setProperty(
        "transform",
        makeTransformValue({ x, y, scale }, use3DTransform)
      );
    }
  };

  toggleWillChange = () => {
    const { current: div } = this.innerRef;

    if (div) {
      requestAnimationFrame(() => {
        div.style.setProperty("will-change", "auto");

        requestAnimationFrame(() => {
          div.style.setProperty("will-change", "transform");
        });
      });
    }
  };

  render() {
    return (
      <QuickPinchZoom
        onZoomEnd={this.toggleWillChange}
        onDragEnd={this.toggleWillChange}
        onUpdate={this.onUpdate}
      >
        <Belarus
          ref={this.innerRef}
          src="https://user-images.githubusercontent.com/4661784/56037265-88219f00-5d37-11e9-95ef-9cb24be0190e.png"
        />
      </QuickPinchZoom>
    );
  }
}

export default WIthImage;

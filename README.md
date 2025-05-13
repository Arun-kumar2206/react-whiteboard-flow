# react-whiteboard-flow

A React component for a whiteboard with drawing, erasing, and JavaScript code-to-flowchart visualization.

## Features

- Freehand drawing (pencil)
- Erasing
- Canvas reset
- Convert JavaScript code to a flowchart and display it on the canvas

## Installation

```
npm install react-whiteboard-flow
```

or

```
yarn add react-whiteboard-flow
```

## Usage

Import and use the `WhiteboardFlow` component in your React app:

```jsx
import React from "react";
import WhiteboardFlow from "react-whiteboard-flow";
import "./App.css";

function App() {
  const exampleCode = `
  const doStuff = (stuff) => {
    if (stuff) {
        if (devFlag) {
            log('perf start');
            doRecursion();
            log('perf end');
            return;
        }
        doRecursion();
        end();
    } else {
        throw new Error('No stuff!');
    }
    return null;
};
  `;

  return (
    <div className="whiteboard-container">
      <WhiteboardFlow
        width="360"
        height="650"
        code={exampleCode}
        className="canvas"
      />
    </div>
  );
}

export default App;
```

## Props

- `width` (number or string): Canvas width (default: 360)
- `height` (number or string): Canvas height (default: 650)
- `code` (string): JavaScript code to visualize as a flowchart
- `className` (string): CSS class for the canvas

## Controls

- **Pencil**: Draw on the canvas
- **Eraser**: Erase parts of the drawing
- **Reset**: Clear the canvas
- **Flowchart**: Toggle between the drawing and the flowchart generated from the provided JS code

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request on [GitHub](https://github.com/Arun-kumar2206/react-whiteboard-flow).

## License

MIT

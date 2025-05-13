# react-whiteboard-flow

A React component for a whiteboard with drawing, erasing, and JavaScript code-to-flowchart visualization.

![npm](https://img.shields.io/npm/v/react-whiteboard-flow)
![license](https://img.shields.io/npm/l/react-whiteboard-flow)
![issues](https://img.shields.io/github/issues/Arun-kumar2206/react-whiteboard-flow)

## ✨ Features

- ✏️ Freehand drawing with pencil tool
- 🧽 Erasing tool
- 🔄 Canvas reset
- 🧠 Convert JavaScript code to a flowchart using `js2flowchart`

## 📦 Installation

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

## 🕹️ Controls

- ✏️ **Pencil** – Draw freely on the canvas using the mouse
- 🧽 **Eraser** – Erase selected parts of your drawing
- 🧹 **Reset** – Clear the entire canvas
- 🧠 **Flowchart** – Generate and toggle a flowchart from the provided JavaScript code


## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request on [GitHub](https://github.com/Arun-kumar2206/react-whiteboard-flow).

## License

MIT

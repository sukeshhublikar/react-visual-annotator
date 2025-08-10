# React Visual Annotator

[![npm version](https://img.shields.io/npm/v/react-visual-annotator.svg)](https://www.npmjs.com/package/react-visual-annotator)
[![npm downloads](https://img.shields.io/npm/dm/react-visual-annotator.svg)](https://www.npmjs.com/package/react-visual-annotator)
[![bundle size](https://img.shields.io/bundlephobia/min/react-visual-annotator.svg)](https://bundlephobia.com/package/react-visual-annotator)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2B%20%7C%2019-blue.svg)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful React-based image and video annotation tool for machine learning, computer vision, and AI training data creation. Perfect for creating datasets for YOLO, COCO, and other object detection models with TypeScript support and Material-UI components.

## Key Features

- **🚀 Optimized Bundle**: 24% smaller bundle size (1.3MB vs 1.7MB) with 38% smaller gzipped size
- **📦 Smart Dependencies**: Uses peer dependencies to avoid version conflicts and reduce duplication
- **💡 TypeScript Support**: Full TypeScript integration with comprehensive type definitions
- **⚛️ React 19 Ready**: Compatible with React 18+ and React 19 with proper JSX runtime support
- **🎨 Professional Interface**: Advanced annotation tools with Material-UI components
- **🔄 Bounding Box Rotation**: Rotate bounding boxes with intuitive controls and 15° snapping
- **⚡ Performance Optimized**: Enhanced with lodash deep cloning and Terser minification
- **🔒 Immutable State Handling**: Robust circular reference prevention and error handling
- **🛠️ Modern Build System**: Vite-powered development and optimized production builds

## Use Cases

- **Machine Learning Training Data**: Create labeled datasets for object detection, image segmentation, and computer vision models
- **YOLO/COCO Dataset Creation**: Generate annotations compatible with popular ML frameworks
- **Medical Imaging**: Annotate medical scans, X-rays, and diagnostic images
- **Autonomous Vehicles**: Label traffic signs, vehicles, pedestrians, and road features
- **Quality Control**: Annotate defects and features in manufacturing and inspection
- **Research Projects**: Academic and commercial computer vision research
- **Content Moderation**: Label and categorize user-generated content

## Features

- Simple input/output format
- Bounding Box, Point and Polygon Annotation with **Rotation Support**
- Keypoint and Landmark Annotation
- Image Segmentation Support
- Zooming, Scaling, Panning
- Multiple Images and Video Support
- Cursor Crosshair
- **Rotatable Bounding Boxes** with visual rotation handles and 15° snap increments

![Screenshot of Annotator](https://user-images.githubusercontent.com/1910070/51199716-83c72080-18c5-11e9-837c-c3a89c8caef4.png)

## Installation

### Step 1: Install the package
```bash
npm i react-visual-annotator
# or
yarn add react-visual-annotator
```

### Step 2: Install peer dependencies
```bash
npm i @mui/material @mui/icons-material @emotion/react @emotion/styled lodash moment
# or
yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled lodash moment
```

### Requirements

- React 18.0.0 or higher (including React 19)
- TypeScript 4.5+ (if using TypeScript)
- Material-UI 5.0.0+ (peer dependency)
- Emotion 11.0.0+ (peer dependency)

## Usage

```javascript
import React from "react";
import ReactImageAnnotate from "react-visual-annotator";

const App = () => (
  <ReactImageAnnotate
    labelImages
    regionClsList={["Alpha", "Beta", "Charlie", "Delta"]}
    regionTagList={["tag1", "tag2", "tag3"]}
    images={[
      {
        src: "https://placekitten.com/408/287",
        name: "Image 1",
        regions: []
      }
    ]}
  />
);

export default App;

```

To get the proper fonts, make sure to import the Inter UI or Roboto font, the
following line added to a css file should suffice.

```css
@import url("https://rsms.me/inter/inter.css");
```

## 🔄 Bounding Box Rotation Feature

The React Visual Annotator now supports rotating bounding boxes for more accurate annotations of rotated objects.

### How to Use Rotation

1. **Create or select a bounding box** - Draw a bounding box or click on an existing one
2. **Look for the blue rotation handle** - A blue circular handle appears on the right side of selected boxes
3. **Drag to rotate** - Click and drag the rotation handle to rotate the box
4. **15° snapping** - The rotation snaps to 15° increments for precise control
5. **Visual feedback** - The box rotates in real-time with proper border rendering

### Rotation Data Format

When using rotation, the bounding box data includes a `rotation` property:

```javascript
const rotatedBox = {
  type: "box",
  id: "box1",
  x: 0.2,        // Normalized x coordinate (0-1)
  y: 0.3,        // Normalized y coordinate (0-1)
  w: 0.4,        // Normalized width (0-1)
  h: 0.2,        // Normalized height (0-1)
  rotation: 45,  // Rotation angle in degrees (0-360)
  color: "#ff0000",
  cls: "object"
};
```

### Benefits of Rotation

- **Accurate annotations** for objects that aren't axis-aligned
- **Better training data** for machine learning models
- **Reduced annotation time** - no need to approximate with larger axis-aligned boxes
- **Improved model accuracy** with more precise bounding boxes

## Props

All of the following properties can be defined on the Annotator...

| Prop                       | Type (\* = required)                                    | Description                                                                                                                                                   | Default       |
|----------------------------|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `taskDescription`          | \*`string`                                              | Markdown description for what to do in the image.                                                                                                             |               |
| `allowedArea`              | `{ x: number, y: number, w: number, h: number }`        | Area that is available for annotation.                                                                                                                        | Entire image. |
| `regionTagList`            | `Array<string>`                                         | Allowed "tags" (mutually inclusive classifications) for regions.                                                                                              |               |
| `regionClsList`            | `Array<string>`                                         | Allowed "classes" (mutually exclusive classifications) for regions.                                                                                           |               |
| `regionTagSingleSelection` | `boolean`                                               | Allowed select only one tag for image.                                                                                                                        |               |
| `regionAllowedActions`     | `{remove?:boolean, lock?:boolean, visibility?: boolean` | Allowed actions for region in regions list.                                                                                                                   | Everything.   |
| `imageTagList`             | `Array<string>`                                         | Allowed tags for entire image.                                                                                                                                |               |
| `imageClsList`             | `Array<string>`                                         | Allowed classes for entire image.                                                                                                                             |               |
| `enabledTools`             | `Array<string>`                                         | Tools allowed to be used. e.g. "select", "create-point", "create-box", "create-polygon"                                                                       | Everything.   |
| `showTags`                 | `boolean`                                               | Show tags and allow tags on regions.                                                                                                                          | `true`        |
| `selectedImage`            | `string`                                                | URL of initially selected image.                                                                                                                              |               |
| `images`                   | `Array<Image>`                                          | Array of images to load into annotator                                                                                                                        |               |
| `showPointDistances`       | `boolean`                                               | Show distances between points.                                                                                                                                | `false`       |
| `pointDistancePrecision`   | `number`                                                | Precision on displayed points (e.g. 3 => 0.123)                                                                                                               |               |
| `onExit`                   | `MainLayoutState => any`                                | Called when "Save" is called.                                                                                                                                 |               |
| `RegionEditLabel`          | `Node`                                                  | React Node overriding the form to update the region (see `RegionLabel` component) |               |
| `allowComments`            | `boolean`                                               | Show a textarea to add comments on each annotation.                                                                                                           | `false`       |
| `hidePrev`                 | `boolean`                                               | Hide `Previous Image` button from the header bar.                                                                                                             | `false`       |
| `hideNext`                 | `boolean`                                               | Hide `Next Image` button from the header bar.                                                                                                                 | `false`       |
| `hideClone`                | `boolean`                                               | Hide `Clone` button from the header bar.                                                                                                                      | `false`       |
| `hideSettings`             | `boolean`                                               | Hide `Settings` button from the header bar.                                                                                                                   | `false`       |
| `hideFullScreen`           | `boolean`                                               | Hide `FullScreen/Window` button from the header bar.                                                                                                          | `false`       |
| `hideSave`                 | `boolean`                                               | Hide `Save` button from the header bar.                                                                                                                       | `false`       |

## Developers

### Development

This project uses Vite for development and building. To begin developing, run the following commands in the cloned repo:

1. `yarn install` - Install all dependencies
2. `yarn start` - Start the development server
3. `yarn build` - Build for production

**Note**: React and React-DOM are configured as peer dependencies for the published package, but are installed as dev dependencies for development. This ensures proper version compatibility in your projects.

#### Development Environment Setup

- **Node.js**: Ensure you have Node.js 16+ installed
- **Package Manager**: Uses Yarn for dependency management
- **TypeScript**: Full TypeScript support with strict type checking
- **React**: Compatible with React 18+ and React 19

#### Building for Production

The build process creates optimized bundles in the `dist/` folder:
- ES modules for modern bundlers
- TypeScript declarations
- Optimized for tree-shaking

For development setup, see the instructions above.

## Troubleshooting

### Common Issues

#### Missing Peer Dependencies
If you get errors about missing modules, install all required peer dependencies:
```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled lodash moment
```

#### React/React-DOM Version Conflicts
If you encounter peer dependency warnings, ensure you have React 18+ installed:
```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

#### Material-UI Version Conflicts
Ensure you're using Material-UI v5.0.0 or higher:
```bash
npm install @mui/material@^5.0.0 @mui/icons-material@^5.0.0
```

#### ImmutableError Issues
This version includes comprehensive fixes for immutable object handling. If you still encounter circular reference errors, please file an issue with your specific use case.

#### Monaco Editor Issues
The package now uses `@monaco-editor/react` instead of the deprecated `react-monaco-editor`. No action needed - the upgrade is automatic.

## Alternative Search Terms

If you're looking for this package, you might have searched for:
- React image annotation
- React annotation tool
- Image labeling React
- Computer vision annotation
- React bounding box
- ML training data tool
- Object detection annotation
- React image tagger
- YOLO annotation tool
- COCO dataset creator

### Performance Tips

- The library automatically handles memory optimization through lodash deep cloning
- Large annotation datasets are efficiently managed through the improved state system
- Consider using React.memo for custom components when integrating with the annotator

## Changelog

### Version 1.2.0

#### 🔄 **Bounding Box Rotation Feature**
- **NEW: Rotatable bounding boxes**: Click and drag the blue rotation handle to rotate bounding boxes
- **15° snap increments**: Precise rotation control with automatic snapping
- **Visual rotation handles**: Intuitive blue circular handle positioned on the right side of selected boxes
- **Proper border rendering**: White dotted borders and all UI elements rotate correctly with the box
- **Full integration**: Rotation works with history/undo, video annotations, and state persistence
- **Export compatibility**: Rotation angle stored as `rotation` property in annotation data

#### 🎯 **Technical Improvements**
- **Enhanced SVG rendering**: Proper rotation transforms for both fill and stroke elements
- **Improved handle positioning**: All transform handles (resize + rotation) position correctly for rotated boxes
- **Mathematical precision**: Uses trigonometric calculations for accurate handle positioning
- **State management**: Full integration with existing action/reducer system

### Version 1.1.0

#### 🚀 **Bundle Size Optimization**
- **24% smaller bundle size**: Reduced from 1.7MB to 1.3MB
- **38% smaller gzipped**: Reduced from 425kB to 265kB  
- **Terser minification**: Enhanced compression with console/debugger removal
- **Better tree-shaking**: Improved dead code elimination

#### 📦 **Dependency Management**
- **Peer dependencies**: Moved large dependencies (@mui/material, @emotion, lodash, moment) to peer dependencies
- **Reduced conflicts**: Users can now use their own versions of Material-UI and Emotion
- **Smaller installation**: Core package is now significantly smaller

#### 🔧 **Technical Improvements**
- **Enhanced Vite config**: Optimized build configuration for libraries
- **TypeScript fixes**: Resolved useReducer typing issues
- **Better compatibility**: Improved integration with different React project setups

#### ⚠️ **Breaking Changes**
- **Peer dependencies required**: Users must now install peer dependencies manually
- **Installation process**: Now requires two-step installation (see Installation section)

### Version 1.0.0

#### 🚀 **Performance Improvements**
- **Replaced JSON serialization with lodash cloneDeep**: Improved performance and reliability for deep object cloning throughout the application
- **Enhanced memory management**: Better handling of circular references in state management and history operations
- **Optimized immutable operations**: Reduced performance overhead in history, regions, and state operations
- **Safe prop handling**: Implemented comprehensive deep cloning for all immutable props passed to components

#### 🔧 **Technical Updates**
- **React 19 compatibility**: Full support for React 19 with backward compatibility to React 18+
- **Dependency management**: Proper peer dependency setup for React ecosystem compatibility
- **FontAwesome fixes**: Resolved React 19 compatibility issues with FontAwesome icons by adding className props
- **Monaco Editor upgrade**: Updated from `react-monaco-editor` to `@monaco-editor/react` for better React 19 support
- **Development environment**: Fixed Vite dependency resolution for React/React-DOM in development mode
- **Build optimization**: Improved library build configuration for npm publishing

#### 🐛 **Bug Fixes**
- **Fixed ImmutableError in multiple components**: Resolved circular reference errors in:
  - RegionSelectAndTransformBoxes (region handling)
  - HistorySidebarBox (history operations)
  - ClassSelectionMenu and other sidebar components
- **Resolved Monaco Editor errors**: Fixed `editorWillMount is not a function` compatibility issues
- **Fixed deeply nested object errors**: Prevented immutable construction errors from seamless-immutable
- **Improved error handling**: Added try-catch blocks and defensive programming patterns
- **Type safety improvements**: Enhanced TypeScript type safety throughout the codebase

#### 📦 **Package & Publishing**
- **NPM ready**: Configured for npm publication with proper package.json setup
- **Module exports**: Added modern ES module exports with proper TypeScript definitions
- **Peer dependencies**: Correctly configured React and React-DOM as peer dependencies
- **Build artifacts**: Optimized dist folder structure for library consumption

### Icons

Consult these icon repositories:

- [Material Icons](https://material.io/tools/icons/)
- [Font Awesome Icons](https://fontawesome.com/icons?d=gallery&m=free)

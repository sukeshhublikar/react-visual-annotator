# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-01-10

### 🔄 Added
- **Bounding Box Rotation Feature**: Complete rotation system for bounding boxes
  - Blue circular rotation handle appears on the right side of selected boxes
  - 15° snap increments for precise rotation control
  - Real-time visual feedback during rotation
  - Rotation angle stored as `rotation` property (0-360 degrees) in annotation data
  - Full integration with history/undo system
  - Compatible with video annotations and state persistence

### 🎯 Improved
- **Enhanced SVG rendering**: Proper rotation transforms for both fill and stroke elements
- **Mathematical precision**: Uses trigonometric calculations for accurate handle positioning
- **Handle positioning**: All transform handles (resize + rotation) position correctly for rotated boxes
- **Visual consistency**: All UI elements rotate together seamlessly

### 🐛 Fixed
- **HighlightBox rotation**: White dotted selection border now rotates properly with bounding boxes
- **Handle positioning**: Rotation handle correctly positioned on right side of boxes
- **Border rendering**: Both fill and stroke elements now rotate correctly

### 📚 Changed
- **Updated documentation**: Added comprehensive rotation feature documentation
- **Enhanced keywords**: Added rotation-related keywords for better npm discoverability
- **Version bump**: Updated to v1.2.0 to reflect new major feature

## [1.1.0] - 2025-01-10

### 🚀 Bundle Size Optimization
- **24% smaller bundle size**: Reduced from 1.7MB to 1.3MB
- **38% smaller gzipped**: Reduced from 425kB to 265kB  
- **Terser minification**: Enhanced compression with console/debugger removal
- **Better tree-shaking**: Improved dead code elimination

### 📦 Dependency Management
- **Peer dependencies**: Moved large dependencies (@mui/material, @emotion, lodash, moment) to peer dependencies
- **Reduced conflicts**: Users can now use their own versions of Material-UI and Emotion
- **Smaller installation**: Core package is now significantly smaller

### 🔧 Technical Improvements
- **Enhanced Vite config**: Optimized build configuration for libraries
- **TypeScript fixes**: Resolved useReducer typing issues
- **Better compatibility**: Improved integration with different React project setups

### ⚠️ Breaking Changes
- **Peer dependencies required**: Users must now install peer dependencies manually:
  ```bash
  npm install @mui/material @mui/icons-material @emotion/react @emotion/styled lodash moment
  ```
- **Installation process**: Now requires two-step installation (see README)

## [1.0.0] - 2025-01-10

### 🚀 Performance Improvements
- **Replaced JSON serialization with lodash cloneDeep**: Improved performance and reliability for deep object cloning
- **Enhanced memory management**: Better handling of circular references in state management and history operations
- **Optimized immutable operations**: Reduced performance overhead in history, regions, and state operations
- **Safe prop handling**: Implemented comprehensive deep cloning for all immutable props passed to components

### 🔧 Technical Updates
- **React 19 compatibility**: Full support for React 19 with backward compatibility to React 18+
- **Dependency management**: Proper peer dependency setup for React ecosystem compatibility
- **FontAwesome fixes**: Resolved React 19 compatibility issues with FontAwesome icons by adding className props
- **Monaco Editor upgrade**: Updated from `react-monaco-editor` to `@monaco-editor/react` for better React 19 support
- **Development environment**: Fixed Vite dependency resolution for React/React-DOM in development mode
- **Build optimization**: Improved library build configuration for npm publishing

### 🐛 Bug Fixes
- **Fixed ImmutableError in multiple components**: Resolved circular reference errors in:
  - RegionSelectAndTransformBoxes (region handling)
  - HistorySidebarBox (history operations)
  - ClassSelectionMenu and other sidebar components
- **Resolved Monaco Editor errors**: Fixed `editorWillMount is not a function` compatibility issues
- **Fixed deeply nested object errors**: Prevented immutable construction errors from seamless-immutable
- **Improved error handling**: Added try-catch blocks and defensive programming patterns
- **Type safety improvements**: Enhanced TypeScript type safety throughout the codebase

### 📦 Package & Publishing
- **NPM ready**: Configured for npm publication with proper package.json setup
- **Module exports**: Added modern ES module exports with proper TypeScript definitions
- **Peer dependencies**: Correctly configured React and React-DOM as peer dependencies
- **Build artifacts**: Optimized dist folder structure for library consumption

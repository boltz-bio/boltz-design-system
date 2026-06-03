// Storybook 10 no longer ships ambient declarations for CSS side-effect imports.
// Allow `import './x.css'` in stories/config without type errors.
declare module '*.css';

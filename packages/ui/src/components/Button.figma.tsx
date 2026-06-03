import figma from '@figma/code-connect';
import { Button } from './Button';

// Figma: "Primary button" componentSet in file LvTmQRNQ2FZ6GcrSpwuvgl
figma.connect(Button, 'https://www.figma.com/design/LvTmQRNQ2FZ6GcrSpwuvgl/Boltz-web-2.0?node-id=57-4644', {
  props: {
    variant: figma.enum('Type', {
      Filled: 'black',
      outlined: 'black',
      white: 'white',
    }),
    children: figma.string('Label'),
  },
  example: ({ variant, children }) => (
    <Button variant={variant}>{children}</Button>
  ),
});

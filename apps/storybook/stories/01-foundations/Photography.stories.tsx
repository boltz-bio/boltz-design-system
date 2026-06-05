import type { Meta, StoryObj } from '@storybook/react-vite';
import { Thumbnail, EyebrowLabel } from '@boltz/ui';

// Foundation — Boltz brand photography (Figma node 57-5608). Two distinct
// styles: authentic "People" portraits of scientists, and the "Micro
// Perspective" — extreme macro close-ups of organic and synthetic materials.

const meta = {
  title: '01-Foundations/Photography',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const people = ['/brand/people-1.jpg', '/brand/people-2.jpg', '/brand/people-3.jpg'];
const micro = ['/brand/micro-1.jpg', '/brand/micro-2.jpg', '/brand/micro-3.jpg'];

export const Overview: Story = {
  render: () => (
    <div className="max-w-container flex flex-col gap-3xl">
      {/* People */}
      <section className="flex flex-col gap-lg">
        <EyebrowLabel>Photography</EyebrowLabel>
        <h2 className="text-heading-sm text-text-primary">Photography — People</h2>
        <p className="text-body-md text-text-secondary max-w-body">
          A professional, and authentic representation of individuals in science and technology. The
          imagery captures a balance between expertise and approachability, with a focus on natural
          lighting, minimalistic compositions, and a clean, contemporary aesthetic.
        </p>
        <div className="grid grid-cols-1 gap-lg tablet:grid-cols-3">
          {people.map((src) => (
            <Thumbnail key={src} src={src} aspect="portrait" radius="lg" alt="Boltz scientist portrait" />
          ))}
        </div>
      </section>

      {/* Micro Perspective */}
      <section className="flex flex-col gap-lg">
        <EyebrowLabel>Photography</EyebrowLabel>
        <h2 className="text-heading-sm text-text-primary">Photography — Micro Perspective</h2>
        <p className="text-body-md text-text-secondary max-w-body">
          The Micro Perspective approach highlights textures, patterns, and forms that are often
          overlooked, reinforcing Boltz's commitment to precision and discovery. By capturing extreme
          close-ups of organic and synthetic materials, this style, just like Boltz-1 reveals the
          hidden complexity of the world around us.
        </p>
        <div className="grid grid-cols-1 gap-lg tablet:grid-cols-3">
          {micro.map((src) => (
            <Thumbnail key={src} src={src} aspect="portrait" radius="lg" alt="Boltz micro perspective close-up" />
          ))}
        </div>
      </section>
    </div>
  ),
};

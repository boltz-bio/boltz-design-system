import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, TextInput, TextArea, Select, CheckboxGroup, Button } from '@boltz/ui';

const meta = {
  title: '02-Components/Form',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'Form building blocks: a Field wrapper (label, required marker, hint, error) around pill-shaped TextInput and Select controls, a rounded TextArea for longer answers, and a CheckboxGroup. Styled from DESIGN.md input-default / input-focus / input-error.',
      },
    },
  },
  argTypes: {
    required: { control: 'boolean' },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextField: Story = {
  args: {
    label: 'Work email',
    required: true,
    hint: 'Please use your work email address.',
    children: <TextInput type="email" placeholder="name@company.com" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Work email',
    required: true,
    error: 'Enter a valid email address.',
    children: <TextInput type="email" defaultValue="name@" />,
  },
};

export const ContactForm: Story = {
  args: { label: '', children: <span /> },
  render: () => (
    <form className="flex max-w-[560px] flex-col gap-lg" onSubmit={(e) => e.preventDefault()}>
      <Field label="Full name" required>
        <TextInput placeholder="Your full name" />
      </Field>
      <Field label="Team size" required>
        <Select
          options={[
            { value: '1-10', label: '1–10 people' },
            { value: '11-50', label: '11–50 people' },
          ]}
        />
      </Field>
      <CheckboxGroup
        label="What are you interested in?"
        name="interests"
        options={[
          { value: 'small-molecule', label: 'Small molecule design' },
          { value: 'protein', label: 'Protein design' },
        ]}
      />
      <Field label="Tell us more about your goal" required hint="Some context on the challenge you want to solve.">
        <TextArea placeholder="What are you working on?" />
      </Field>
      <div>
        <Button type="submit" variant="black">Send</Button>
      </div>
    </form>
  ),
};

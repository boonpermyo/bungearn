import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import Form from '../form/form';
import FormField from '../form/fields/form-field';
import FormItem from '../form/fields/form-item';
import FormLabel from '../form/fields/form-label';
import FormErrorMessage from '../form/fields/form-error-message';
import TextInput from '../form/inputs/text';
import CheckboxInput from '../form/inputs/checkbox';
import ButtonSubmit from '../form/fields/button-submit';

const meta = {
  title: 'Components/Form',
  component: Form
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  render: () => {
    const form = useForm({
      defaultValues: { name: '', agree: false },
      mode: 'onBlur'
    });

    return (
      <div style={{ maxWidth: 360 }}>
        <Form
          form={form}
          onValid={(values) => {
            // eslint-disable-next-line no-console
            console.log('Submit', values);
          }}
        >
          <FormField
            control={form.control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Name</FormLabel>
                <TextInput placeholder="Enter your name" controlField={field} />
                <FormErrorMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agree"
            rules={{ required: 'Please accept terms' }}
            render={({ field }) => (
              <FormItem>
                <CheckboxInput controlField={field}>I agree to the terms</CheckboxInput>
                <FormErrorMessage />
              </FormItem>
            )}
          />

          <ButtonSubmit type="primary" style={{ marginTop: 12 }}>
            Submit
          </ButtonSubmit>
        </Form>
      </div>
    );
  }
};

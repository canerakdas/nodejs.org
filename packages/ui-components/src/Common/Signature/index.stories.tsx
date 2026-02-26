import FunctionDefinition from '#ui/Common/Signature';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof FunctionDefinition>;
type Meta = MetaObj<typeof FunctionDefinition>;

export const Default: Story = {
  args: {
    title: 'Attributes',
    children: (
      <>
        <FunctionDefinition
          name="attribute1"
          type={
            <>
              <a href="#">&lt;Type1&gt;</a>|<a href="#">&lt;Type2&gt;</a>
            </>
          }
        />
        <FunctionDefinition
          name="attribute2"
          optional
          type={<a href="#">&lt;Object&gt;</a>}
          description="An optional attribute."
        >
          <FunctionDefinition
            name="option1"
            type={<a href="#">&lt;Type3&gt;</a>}
          />
          <FunctionDefinition
            name="option2"
            type={<a href="#">&lt;Type3&gt;</a>}
          />
          <FunctionDefinition
            name="option3"
            type={<a href="#">&lt;Type3&gt;</a>}
            description="One of the available options."
          />
        </FunctionDefinition>
        <FunctionDefinition
          name="Returns"
          type={<a href="#">&lt;Type4&gt;</a>}
          description="Returns the result of the function."
          kind="return"
        />
      </>
    ),
  },
};

export const WithLongAttributeNames: Story = {
  args: {
    title: 'Attributes',
    children: (
      <>
        <FunctionDefinition
          name="thisIsAnAttributeWithAnExcessivelyLongNameToTestTextWrapping"
          type={
            <>
              <a href="#">&lt;Type1&gt;</a>|<a href="#">&lt;Type2&gt;</a>
            </>
          }
        />
      </>
    ),
  },
};

export const WithLongTypeAndAttributeNames: Story = {
  args: {
    title: 'Attributes',
    children: (
      <>
        <FunctionDefinition
          name="attribute1"
          type={
            <>
              <a href="#">
                &lt;ThisIsATypeWithAnExcessivelyLongNameToTestTextWrapping&gt;
              </a>
            </>
          }
        />
      </>
    ),
  },
};

export const OptionalAttribute: Story = {
  args: {
    title: 'Attributes',
    children: (
      <FunctionDefinition
        name="optionalAttribute"
        optional
        type={<a href="#">&lt;Object&gt;</a>}
        description="An optional attribute."
      />
    ),
  },
};

export default {
  component: FunctionDefinition,
} as Meta;

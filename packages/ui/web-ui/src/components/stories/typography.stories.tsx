import type { Meta, StoryObj } from '@storybook/react-vite';
import Title from '../typography/title';
import Paragraph from '../typography/paragraph';
import Text from '../typography/text';
import Link from '../typography/link';

const meta = {
  title: 'Components/Typography'
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const TitleLevels: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '8px' }}>
      <Title level={1}>Heading 1</Title>
      <Title level={2}>Heading 2</Title>
      <Title level={3}>Heading 3</Title>
      <Title level={4}>Heading 4</Title>
      <Title level={5}>Heading 5</Title>
    </div>
  )
};

export const ParagraphAndText: Story = {
  render: () => (
    <div>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, numquam asperiores voluptates
        cum veniam libero molestiae corporis officiis qui eum rerum totam doloribus distinctio laudantium
        nemo sequi dolores! Sapiente aliquam iusto consequatur perferendis nulla adipisci enim pariatur
        recusandae aliquid ipsum beatae, quis fugit magni obcaecati ratione quam provident reprehenderit
        atque.
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, numquam asperiores voluptates
        cum veniam libero molestiae corporis officiis qui eum rerum totam doloribus distinctio laudantium
        nemo sequi dolores! Sapiente aliquam iusto consequatur perferendis nulla adipisci enim pariatur
        recusandae aliquid ipsum beatae, quis fugit magni obcaecati ratione quam provident reprehenderit
        atque.
      </Paragraph>
      <Title>Paragraph with ellipsis</Title>
      <Paragraph
        ellipsis={{
          rows: 3,
          tooltip: 'asdfasdfasdf'
        }}
      >
        Ellipsis example: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Necessitatibus voluptates asperiores at deleniti, cupiditate suscipit inventore officiis,
        neque praesentium rem hic fugiat unde? Similique maiores quasi at quibusdam necessitatibus eum
        magni, eligendi possimus? At earum ea in laudantium enim dolore culpa natus quia facere
        reprehenderit veniam, sit perferendis similique non dolores id ut vero numquam esse ab? Incidunt
        sequi explicabo ut soluta quos, error doloribus nemo earum veniam facere nobis itaque? Inventore
        cumque saepe, atque tempora deserunt itaque laboriosam, laborum, aperiam vel debitis harum
        temporibus sint quisquam doloribus eum vero quae officia. Inventore eum, sit quas sint doloremque
        iure illo.
      </Paragraph>
      <Title>Text with ellipsis</Title>
      <Text type="secondary" ellipsis={{ tooltip: 'sdfsdfsdf' }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet perspiciatis aliquid, corrupti
        accusantium nostrum obcaecati deserunt illum tempora a ratione quisquam rem eum maiores culpa
        harum sint omnis alias repellat excepturi veniam quasi laborum impedit quia! At, nesciunt libero,
        ab eligendi dignissimos quam repellendus repellat perferendis rem a incidunt quo amet. Excepturi
        libero ad dignissimos nostrum, aspernatur pariatur dolorem velit, soluta accusamus officia
        ratione blanditiis fugiat nisi eveniet facilis assumenda dolores odit sequi sapiente autem
        aliquam sint corporis! Iusto veniam ullam possimus reprehenderit officia quisquam accusamus
        voluptate libero sapiente sit, quam quas corporis vitae atque in! Nostrum fuga porro beatae.
      </Text>
      <Text strong>Strong text</Text>
      <Text mark>Marked text</Text>
      <Title>Link</Title>
      <Link href="https://example.com" target="_blank" ellipsis>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet perspiciatis aliquid, corrupti
        accusantium nostrum obcaecati deserunt illum tempora a ratione quisquam rem eum maiores culpa
        harum sint omnis alias repellat excepturi veniam quasi laborum impedit quia! At, nesciunt libero,
        ab eligendi dignissimos quam repellendus repellat perferendis rem a incidunt quo amet. Excepturi
        libero ad dignissimos nostrum, aspernatur pariatur dolorem velit, soluta accusamus officia
        ratione blanditiis fugiat nisi eveniet facilis assumenda dolores odit sequi sapiente autem
        aliquam sint corporis! Iusto veniam ullam possimus reprehenderit officia quisquam accusamus
        voluptate libero sapiente sit, quam quas corporis vitae atque in! Nostrum fuga porro beatae.
      </Link>
    </div>
  )
};

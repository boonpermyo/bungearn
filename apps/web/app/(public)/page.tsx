'use client';

import { Avatar, Button, Modal, Paragraph, Title, UploadInput } from '@whispa/web-ui/components';
import { useFeedback, useModalState, useTheme } from '@whispa/web-ui/hooks';
import { MessageCircle } from '@whispa/web-ui/icons';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const { setTheme } = useTheme();
  const [file, setFile] = useState<string | null>(null);
  const { modal } = useFeedback();
  const { isOpen, open, close } = useModalState();
  return (
    <main className="max-w-7xl w-full flex-1 mx-auto px-6">
      <UploadInput
        onChange={async ({ fileList }) => {
          const [currentFile] = fileList;
          const origin = currentFile?.originFileObj;

          if (file) {
            URL.revokeObjectURL(file);
          }

          if (!origin) {
            console.warn('No originFileObj found');
            return;
          }

          setFile(URL.createObjectURL(origin));
        }}
      >
        <Button>Upload</Button>
      </UploadInput>
      <Title className="text-primary!">Header</Title>
      <Button onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
      <Button
        onClick={async () => {
          const confirm = await modal.confirm({
            content: 'sdfsdf'
          });
          console.log('[LOG] - page.tsx:38 - Home - confirm:', confirm);
        }}
      >
        Modal
      </Button>
      <Button
        onClick={async () => {
          open({});
        }}
      >
        open modal
      </Button>
      <Modal className="" open={isOpen} onOk={close} onCancel={close}>
        <h1>sodfijaosdfjaopsdjfi</h1>
      </Modal>
      <h1>sdfsfasfasd</h1>
      {file && <Image src={file} alt="sdfsdfsdf" width={1000} height={1000} />}
      <Avatar
        badge={{
          dot: true,
          // placement: 'topLeft',
          // offset: [-6, 6],
          color: 'green'
          // style: { width: 12, height: 12, minWidth: 12 }
        }}
      />
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-center">
          <div className="bg-linear-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl">
            <MessageCircle className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-white text-6xl">Whispa</h1>
        <p className="text-white/70 text-xl">Talk to strangers anonymously</p>
      </div>
      <Paragraph>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, modi in? Tenetur, totam
        dignissimos eos sit voluptatem quaerat ad quidem! Unde ipsa adipisci rem dicta ipsam. Voluptate
        nulla sed porro aut deleniti unde ex, libero aperiam error ipsam doloremque id ut necessitatibus,
        consectetur cupiditate tenetur ad totam? Neque, praesentium? Eaque aut quod sint repellendus
        recusandae similique. Veniam soluta nihil accusamus dolorem explicabo animi minima dolorum cum
        qui ea excepturi ipsam cumque, rerum numquam voluptatem ducimus et sequi velit? Assumenda
        corrupti molestias molestiae quam sunt tempora atque reprehenderit voluptates et dolorum iusto
        dignissimos, consectetur autem doloremque tempore iste culpa, quas dolorem beatae, alias dolores
        quos nihil? Aliquid maiores, eaque sit hic nihil, delectus aliquam nisi ducimus, quisquam nemo
        excepturi ex dolorum nostrum dignissimos vitae nobis quidem sunt doloribus fuga. Similique,
        molestias. Sunt id deleniti in officia fuga odio quam voluptas obcaecati ut aut incidunt
        repudiandae dignissimos culpa facere quas nisi, ipsa aperiam, totam velit voluptatem accusamus
        ullam. Laboriosam nam maxime suscipit iusto magnam nemo fugit accusantium sed rem eos eius
        laudantium minima non consequatur nesciunt, voluptas odit sequi hic voluptate doloremque.
        Similique et quo dolorem. Rem quia a, ea et fuga reprehenderit dolorem iste sed maiores quae ipsa
        tempore aperiam, deleniti provident. Natus recusandae aliquid saepe consequuntur voluptatum
        tempora necessitatibus doloribus doloremque itaque cum harum dolore dignissimos repellendus quasi
        debitis tempore, dicta esse. Vero asperiores eligendi sint praesentium iusto distinctio
        repellendus vitae mollitia, quisquam minus ad error repudiandae cum voluptatibus illum veritatis
        omnis nihil reprehenderit dolor consectetur temporibus fugit repellat natus autem. Dolores
        accusamus ex facere nam, voluptatibus ullam. Dolor nam error ea vero? Accusantium officiis quos
        voluptate, sequi corrupti possimus maiores sint porro distinctio aperiam optio laudantium vero
        eaque ex vitae esse reiciendis molestias cupiditate aut, molestiae fugit, impedit dolorem. Cumque
        maiores fugit doloribus beatae vel obcaecati inventore accusantium nostrum laborum. Atque ullam
        minima, libero eveniet nostrum magni eum reprehenderit! Delectus consequuntur voluptatum nam
        quasi saepe culpa, qui quam accusamus hic excepturi nesciunt aperiam minus impedit sunt quae
        praesentium nihil nostrum consectetur quidem commodi expedita numquam. Odio laudantium, minima
        corporis itaque quod dolore maiores, voluptatibus repellendus quisquam sint commodi id,
        dignissimos tempore facere beatae. Libero reiciendis quibusdam ab laborum, minima, eius harum
        dicta ex magnam laboriosam dolorem consequuntur voluptatem quis vero ut ipsam voluptatibus iste
        inventore, architecto ipsa? Veniam rerum cupiditate repellat officiis! Ex illum corrupti
        blanditiis voluptatem eligendi, ipsa possimus magni quos. Neque laborum velit molestias quisquam
        repellat dicta laudantium. Numquam consequatur eum enim repellat. Tempore ullam, quidem commodi
        corporis debitis eveniet maiores dicta saepe vitae a distinctio nesciunt! Nam reprehenderit non
        ipsam facere quasi odit quod vitae quam velit odio nostrum, eaque repellat autem! In, assumenda
        ullam earum corporis blanditiis hic unde fugit harum et quis quia mollitia repellat ad odio eius
        deleniti aliquid aliquam optio qui animi maiores. Et temporibus facere ipsam distinctio saepe
        fugit esse fugiat animi vel id, cupiditate, atque sunt tempore autem culpa repellendus magnam
        sequi. Recusandae non fuga temporibus magnam earum consequuntur id aut neque ipsum expedita alias
        quod amet provident, iure odit eos laboriosam facilis illum mollitia itaque iste? Nostrum,
        perspiciatis iusto? Vero repellat perferendis veritatis? Aspernatur, vero? Omnis eum pariatur
        unde eligendi molestias cumque recusandae aperiam consectetur amet fugit illum praesentium optio
        et repellendus vel, autem, veritatis, ratione architecto illo temporibus sint quae voluptatum
        animi! Harum quasi consequatur accusamus dolore quae eveniet, ducimus molestiae quis, aliquid
        repellat ullam vel id doloribus illo! Aliquid fugiat tempora nam cum dolores animi, explicabo vel
        facilis magnam eius minima quod hic architecto ex ullam, molestias fugiat in exercitationem
        dolor!
      </Paragraph>
    </main>
  );
}

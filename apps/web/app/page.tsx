'use client';

import { Avatar, Button, Modal, UploadInput } from '@whispa/web-ui/components';
import { useFeedback, useModalState, useTheme } from '@whispa/web-ui/hooks';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const { setTheme } = useTheme();
  const [file, setFile] = useState<string | null>(null);
  const { modal } = useFeedback();
  const { isOpen, open, close } = useModalState();
  return (
    <div>
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
    </div>
  );
}

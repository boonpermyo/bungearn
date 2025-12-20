'use client';

import { Button, Modal, UploadInput } from '@whispa/web-ui/components';
import { useFeedback, useModalState } from '@whispa/web-ui/hooks';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
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
      <Modal className="" open={isOpen} onCancel={close}>
        <h1>sodfijaosdfjaopsdjfi</h1>
      </Modal>
      <h1>sdfsfasfasd</h1>
      {file && <Image src={file} alt="sdfsdfsdf" width={1000} height={1000} />}
    </div>
  );
}

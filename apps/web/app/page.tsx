'use client';

import {
  Box,
  Button,
  Loading,
  TextInput,
  UploadInput,
  useLoadingFullscreen
} from '@whisper-loop/web-ui/components';
import { useFeedback, useTheme } from '@whisper-loop/web-ui/hooks';
import { useState } from 'react';

export default function Home() {
  const { setTheme } = useTheme();
  const { modal } = useFeedback();

  const [loading, setLoading] = useState<boolean>(false);
  const { showLoadingFullscreen, hideLoadingFullscreen } = useLoadingFullscreen();

  return (
    <Box>
      <h1 className="dark:text-red-500 text-green-800">App</h1>
      <Button variant="solid">HELLL OWORLD</Button>
      <TextInput />
      <Loading />
      <UploadInput multiple>
        <Button>Upload</Button>
      </UploadInput>
      <Button onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
      <Button
        onClick={() => {
          // modal.success({
          //   title: 'HELLO',
          //   onOk: () => {
          //     modal.error({});
          //   }
          // });
          // setLoading(true);
          showLoadingFullscreen();
          setTimeout(() => {
            // setLoading(false);
            hideLoadingFullscreen();
          }, 3000);
        }}
      >
        Show modal
      </Button>
    </Box>
  );
}

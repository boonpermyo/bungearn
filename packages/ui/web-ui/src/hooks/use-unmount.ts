'use client';

import { useEffect } from 'react';

export default function useUnmount(callback: React.EffectCallback) {
  useEffect(() => {
    return () => {
      callback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

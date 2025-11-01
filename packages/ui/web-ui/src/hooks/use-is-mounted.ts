'use client';

import { useEffect, useState } from 'react';

export type UseIsMountedResult = boolean;

export default function useIsMounted(): UseIsMountedResult {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

'use client';

import Image from 'next/image';
import { useState, ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Image>, 'onError'>;

export default function RetryImage(props: Props) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed]   = useState(false);

  if (failed) {
    return <div className="absolute inset-0 bg-zinc-900" />;
  }

  return (
    <Image
      key={attempt}
      {...props}
      onError={() => {
        if (attempt < 2) {
          setTimeout(() => setAttempt(a => a + 1), 1500);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

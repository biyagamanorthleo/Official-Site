'use client';

import Image from 'next/image';
import { useState, ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Image>, 'onError'>;

export default function RetryImage(props: Props) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed]   = useState(false);

  // Bypass Next.js proxy for Supabase URLs — serve directly from their CDN
  // to avoid intermittent proxy timeouts.
  const isSupabase =
    typeof props.src === 'string' && props.src.includes('.supabase.co');

  if (failed) {
    return <div className="absolute inset-0 bg-zinc-900" />;
  }

  return (
    <Image
      key={attempt}
      {...props}
      unoptimized={isSupabase}
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

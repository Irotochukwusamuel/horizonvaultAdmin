'use client';

import dynamic from 'next/dynamic';
// import Image from 'next/image';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
import { useSize } from 'react-use';

export default function VideoPlayer({ src }: { src: string }) {
  const [sized, { width, height }] = useSize(
    ({ width }) => (
      <ReactPlayer
        url={src}
        width='680'
        height='400'
        // light={
        //   <Image
        //     src="https://example.com/thumbnail.png"
        //     alt="Thumbnail"
        //     width={0}
        //     height={0}
        //     className="h-full w-full"
        //   />
        // }
        className='react-player relative h-full bg-gray-200'
        style={{ borderRadius: '8px', height: 400 }}
        controls
      />
    ),
    { height: 400 }
  );

  return (
    <div
      style={{ height }}
      className='relative min-h-[400px] w-full rounded-[8px]'
    >
      {sized}
    </div>
  );
}

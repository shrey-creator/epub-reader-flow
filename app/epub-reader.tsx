"use client";

import React from 'react';

const EpubReader = (params:any) => {
    const iframeStyle = {
        width: '100%',
        height: '100vh', // 100% of the viewport height
      };

      const IFRAME_URL=process.env.NEXT_PUBLIC_IFRAME_URL

  return (
    <iframe
      src={`${IFRAME_URL}/?url=${params.url}`}
      width="100%"
      height="500px"
      title="EPUB Reader"
      style={iframeStyle}

    ></iframe>
  );
};

export default EpubReader;

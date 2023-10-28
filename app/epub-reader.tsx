
import React from 'react';

const EpubReader = (params:any) => {
    

      const IFRAME_URL=process.env.NEXT_PUBLIC_IFRAME_URL
      const IFRAME_URL_WITH_QUERY=`${IFRAME_URL}/?url=${params.url}`
      console.log('IFRAME_URL_WITH_QUERY',IFRAME_URL_WITH_QUERY)

  return (
    <iframe
      src={`${IFRAME_URL_WITH_QUERY}`}
      width="100%"
      height="90%"
      title="EPUB Reader"

    ></iframe>
  );
};

export default EpubReader;

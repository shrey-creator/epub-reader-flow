import React from 'react';

interface AlbumCoverProps {
  src: string;
  alt: string;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="album-cover" />;
};

export default AlbumCover;

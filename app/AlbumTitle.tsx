import React from 'react';

interface AlbumTitleProps {
  title: string;
}

const AlbumTitle: React.FC<AlbumTitleProps> = ({ title }) => {
  return <h1 className="album-title">{title}</h1>;
};

export default AlbumTitle;

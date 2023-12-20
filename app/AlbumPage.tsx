import React from 'react';
import AlbumCover from './AlbumCover';
import AlbumTitle from './AlbumTitle';
import PlayAllButton from './PlayAllButton';
import SongList from './SongList';

export default function AlbumPage({ albumData }) {
  return (
    <div className="album-page">
      <header>
        <AlbumCover src={albumData.coverImage} alt={albumData.title} />
        <AlbumTitle title={`${albumData.title}`}></AlbumTitle>
        <PlayAllButton albumId={albumData.id} onClick={function (): void {
                  throw new Error('Function not implemented.');
              } } />
      </header>
      <main>
        <SongList songs={albumData.songs} />
      </main>
    </div>
  );
}

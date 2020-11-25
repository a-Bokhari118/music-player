import LibrarySong from './LibrarySong';
const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
  setLibraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibrarySong
            audioRef={audioRef}
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            key={song.id}
            isPlaying={isPlaying}
            setSongs={setSongs}
            setLibraryStatus={setLibraryStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;

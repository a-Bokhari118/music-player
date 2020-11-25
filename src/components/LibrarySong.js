const LibrarySong = ({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  songs,
  setSongs,
  setLibraryStatus,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //Update the active state
    setSongs(
      songs.map((targetSong) => {
        return {
          ...targetSong,
          active: targetSong.id === song.id,
        };
      })
    );

    if (isPlaying) audioRef.current.play();
    setLibraryStatus(false);
  };
  return (
    <div
      className={`library-song ${song.active ? 'selected' : ''}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name} />
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;

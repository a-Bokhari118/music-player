const Song = ({ currentSong, songInfo }) => {
  const songAnimation = {
    transform: `rotate(${songInfo.currentTime * 10}deg)`,
  };
  return (
    <div className='song-container'>
      <img
        src={currentSong.cover}
        alt={currentSong.name}
        style={songAnimation}
      />

      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;

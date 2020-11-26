import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faRandom,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  currentSong,
  setCurrentSong,
  setSongs,
  isShuffle,
  setIsShuffle,
  isLoop,
  setIsLoop,
  activeLibraryHandler,
}) => {
  const [volume, setVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolumeValue, setPrevVolumeValue] = useState(volume);
  //events handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (isShuffle) {
      const nextSong = random(1, songs.length);
      if (songs[nextSong] !== currentSong) {
        await setCurrentSong(songs[nextSong]);
        activeLibraryHandler(songs[nextSong]);
        if (isPlaying) audioRef.current.play();
        return;
      }
    }

    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  //Add the slider style
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
    volume: {
      transform: `translateX(${volume}%)`,
    },
  };
  const volumeBackground = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  const onVolumeClickHandler = () => {
    if (isMuted) {
      audioRef.current.volume = prevVolumeValue / 100;
      setVolume(prevVolumeValue);
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
      setPrevVolumeValue(volume);
      setVolume(0);
    }
  };

  const onVolumeChangeHandler = (e) => {
    const volumeLevel = e.target.value / 100;

    audioRef.current.volume = volumeLevel;

    setVolume(e.target.value);
  };
  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className='track'
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type='range'
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div className='animate-track' style={trackAnim}></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='play-volume-wrapper'>
        <div className='play-control'>
          <FontAwesomeIcon
            className='skip-back'
            onClick={() => skipTrackHandler('skip-back')}
            size='2x'
            icon={faAngleLeft}
          />
          <div style={{ padding: '0 10px' }}>
            <FontAwesomeIcon
              className='play'
              size='2x'
              icon={isPlaying ? faPause : faPlay}
              onClick={playSongHandler}
            />
          </div>

          <FontAwesomeIcon
            className='skip-forward'
            onClick={() => skipTrackHandler('skip-forward')}
            size='2x'
            icon={faAngleRight}
          />
        </div>
        <div className='volume-control'>
          <div className='track-volume' style={volumeBackground}>
            <input
              type='range'
              min={0}
              max={100}
              onChange={onVolumeChangeHandler}
              value={volume}
            />
            <div style={trackAnim.volume} className='animate-volume'></div>
          </div>
          <FontAwesomeIcon
            onClick={onVolumeClickHandler}
            className={'volume'}
            icon={isMuted ? faVolumeMute : faVolumeUp}
          />
        </div>
      </div>
      <div className='buttons-control'>
        <FontAwesomeIcon
          className='shuffle'
          onClick={() => {
            setIsShuffle(!isShuffle);
          }}
          size='2x'
          icon={faRandom}
          color={isShuffle ? 'green' : 'gray'}
        />
        <FontAwesomeIcon
          className='shuffle'
          onClick={() => {
            setIsLoop(!isLoop);
          }}
          size='2x'
          icon={faUndo}
          color={isLoop ? 'green' : 'gray'}
        />
      </div>
    </div>
  );
};

export default Player;

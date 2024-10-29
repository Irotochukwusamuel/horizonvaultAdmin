import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PauseIcon from '@/assets/icons/player-pause.svg';
import PlayIcon from '@/assets/icons/player-play.svg';
import VolumeIcon from '@/assets/icons/player-volume.svg';
import VolumeMuteIcon from '@/assets/icons/player-volume-mute.svg';

export default function Player({ src }: { src?: string }) {
  return (
    <AudioPlayer
      autoPlay
      src={src || 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3'}
      //   onPlay={(e) => console.log('onPlay')}
      layout='horizontal'
      showSkipControls={false}
      showJumpControls={false}
      customIcons={{
        pause: <PauseIcon />,
        play: <PlayIcon />,
        volume: <VolumeIcon />,
        volumeMute: <VolumeMuteIcon />,
      }}
      // other props here
    />
  );
}

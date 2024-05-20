import { useCallback, useState } from "react";

const useSound = (url: string) => {
  const audioMedia = new Audio(url);
  const [audio] = useState(audioMedia);
  const play = useCallback(() => {
    audio.currentTime = 0;
    audio.play();
  }, [audio]);
  const stop = useCallback(() => {
    audio.currentTime = 0;
    audio.pause();
  }, [audio]);
  return { play, stop };
};
export default useSound;

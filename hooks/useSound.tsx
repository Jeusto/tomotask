import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const useSound = (soundFile: any) => {
  const [soundState, setSoundState] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      if (soundState) {
        soundState.unloadAsync();
      }
    };
  }, [soundState]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSoundState(sound);
    await sound?.playAsync();
  }

  async function stopSound() {
    await soundState?.stopAsync();
  }

  return { playSound, stopSound };
};

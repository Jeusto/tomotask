import { useAppSettingsStore } from '@/stores/settingsStore';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

/**
 * Custom hook to play a sound
 * @param soundFile The sound file to be played
 * @returns playSound and stopSound functions
 */
export const useSound = (soundFile: any) => {
  const [soundState, setSoundState] = useState<Audio.Sound | null>(null);

  const { settings } = useAppSettingsStore();
  const alarmEnabled = settings.sound.alarmEnabled;

  useEffect(() => {
    return () => {
      if (soundState) {
        soundState.unloadAsync();
      }
    };
  }, [soundState]);

  async function playSound() {
    if (!alarmEnabled) {
      return;
    }

    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSoundState(sound);
    await sound?.playAsync();
  }

  async function stopSound() {
    await soundState?.stopAsync();
  }

  return { playSound, stopSound };
};

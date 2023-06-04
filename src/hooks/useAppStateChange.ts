import { useEffect } from 'react';
import { AppState } from 'react-native';

type AppStateChangeCallbacks = {
  onChangeFromActiveToBackground?: () => void;
  onChangeFromBackgroundToActive?: () => void;
};

/**
 * Custom hook to handle app state changes (active -> background and vice versa)
 * @param callbacks Callbacks to be called when the app state changes
 */
export const useAppStateChange = (callbacks: AppStateChangeCallbacks) => {
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: string) => {
        if (
          nextAppState === 'background' &&
          callbacks.onChangeFromActiveToBackground
        ) {
          callbacks.onChangeFromActiveToBackground();
        } else if (
          nextAppState === 'active' &&
          callbacks.onChangeFromBackgroundToActive
        ) {
          callbacks.onChangeFromBackgroundToActive();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [callbacks]);
};

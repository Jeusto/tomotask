import { useEffect } from 'react';
import { AppState } from 'react-native';

type AppStateChangeCallbacks = {
  onChangeFromActiveToBackground?: () => void;
  onChangeFromBackgroundToActive?: () => void;
};

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

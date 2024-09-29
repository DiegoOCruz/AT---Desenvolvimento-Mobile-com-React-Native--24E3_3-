import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  // Get the item from storage when the component is mounted
  useEffect(() => {
    const getItem = async () => {
      if (Platform.OS === 'web') {
        try {
          const value = localStorage.getItem(key);
          setState(value ? JSON.parse(value) : null);
        } catch (e) {
          console.error('Local storage is unavailable:', e);
        }
      } else {
        try {
          const value = await SecureStore.getItemAsync(key);
          setState(value ? JSON.parse(value) : null);
        } catch (e) {
          console.error('SecureStore error:', e);
        }
      }
    };
    
    getItem();
  }, [key]);

  // Set the item both in the state and storage
  const setValue = useCallback(
    (value: string | null) => {
      const serializedValue = value ? JSON.stringify(value) : null;
      setState(value); // Update state with original value
      setStorageItemAsync(key, serializedValue); // Store the serialized value
    },
    [key]
  );

  return [state, setValue];
}

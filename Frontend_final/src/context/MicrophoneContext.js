import { createContext, useContext } from 'react';

export const MicrophoneContext = createContext(null);

export const useMicrophone = () => {
  const context = useContext(MicrophoneContext);
  if (!context) {
    throw new Error('useMicrophone must be used within a MicrophoneProvider');
  }
  return context;
};
import React, { useState, useEffect } from 'react';
import { MicrophoneContext } from './MicrophoneContext';

export const MicrophoneProvider = ({ children }) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      setIsListening(true);
    };

    recognitionInstance.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      // Restart if it stops
      if (!error) {
        recognitionInstance.start();
      }
    };

    recognitionInstance.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    setRecognition(recognitionInstance);

    // Start listening immediately
    try {
      recognitionInstance.start();
    } catch (err) {
      setError(`Failed to start microphone: ${err.message}`);
    }

    // Cleanup
    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [error]); // Added error to dependencies

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (err) {
        setError(`Failed to start microphone: ${err.message}`);
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const value = {
    transcript,
    isListening,
    error,
    startListening,
    stopListening
  };

  return (
    <MicrophoneContext.Provider value={value}>
      {children}
    </MicrophoneContext.Provider>
  );
};
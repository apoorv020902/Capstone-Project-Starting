import { useState, useCallback, useRef, useEffect } from 'react';
import { SpeechRecognitionService } from '../utils/speechRecognition';

export const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionService | null>(null);

  useEffect(() => {
    recognitionRef.current = new SpeechRecognitionService(
      setTranscript,
      setIsListening
    );
    setIsSupported(recognitionRef.current.isSupported());
  }, []);

  const startListening = useCallback(() => {
    recognitionRef.current?.start();
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  };
};
export class SpeechRecognitionService {
  private recognition: any;
  private onTranscriptChange: (transcript: string) => void;
  private onStateChange: (isListening: boolean) => void;
  private supported: boolean;

  constructor(
    onTranscriptChange: (transcript: string) => void,
    onStateChange: (isListening: boolean) => void
  ) {
    this.supported = 'webkitSpeechRecognition' in window;
    this.onTranscriptChange = onTranscriptChange;
    this.onStateChange = onStateChange;

    if (this.supported) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      this.onStateChange(true);
    };

    this.recognition.onend = () => {
      this.onStateChange(false);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.onStateChange(false);
    };

    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.onTranscriptChange(transcript);
    };
  }

  start() {
    if (this.supported) {
      this.recognition.start();
    } else {
      console.error('Speech recognition not supported');
    }
  }

  stop() {
    if (this.supported) {
      this.recognition.stop();
    }
  }

  isSupported() {
    return this.supported;
  }
}
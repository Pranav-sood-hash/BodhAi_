import { useState } from 'react';
import { Mic, Volume2, Loader } from 'lucide-react';

type Status = 'idle' | 'listening' | 'processing' | 'speaking';

interface Message {
  type: 'user' | 'ai';
  text: string;
}

export default function VoiceAssistant() {
  const [status, setStatus] = useState<Status>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState('');

  const handleStartListening = () => {
    setStatus('listening');
    setTranscript('');

    // Simulate listening for 2 seconds
    setTimeout(() => {
      const sampleInputs = [
        'What is photosynthesis?',
        'Explain quantum computing',
        'How do I solve quadratic equations?',
        'What is the capital of France?',
      ];
      const randomInput = sampleInputs[Math.floor(Math.random() * sampleInputs.length)];
      setTranscript(randomInput);
      setStatus('processing');

      // Simulate AI processing
      setTimeout(() => {
        const aiResponse = `I'd be happy to help! Let me explain that in detail. Based on your question about "${randomInput}", here's what you need to know...`;
        setMessages((prev) => [
          ...prev,
          { type: 'user', text: randomInput },
          { type: 'ai', text: aiResponse },
        ]);
        setStatus('speaking');

        // Simulate TTS
        setTimeout(() => {
          setStatus('idle');
          setTranscript('');
        }, 3000);
      }, 1500);
    }, 2000);
  };

  const handlePlayResponse = () => {
    setStatus('speaking');
    setTimeout(() => {
      setStatus('idle');
    }, 2000);
  };

  const statusConfig = {
    idle: { label: 'Click to speak', color: 'from-purple-500 to-pink-500' },
    listening: { label: 'Listening...', color: 'from-cyan-400 to-blue-500' },
    processing: { label: 'Processing...', color: 'from-purple-400 to-purple-600' },
    speaking: { label: 'Speaking...', color: 'from-pink-400 to-pink-600' },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="space-y-6">
      {/* Main Mic Button */}
      <div className="flex flex-col items-center justify-center py-12 space-y-8">
        <button
          onClick={handleStartListening}
          disabled={status !== 'idle'}
          className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${currentStatus.color} p-1 hover:scale-105 disabled:scale-100 smooth-transition neon-glow`}
        >
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
            {status === 'idle' ? (
              <Mic className="w-20 h-20 text-white" />
            ) : (
              <Loader className="w-20 h-20 text-white animate-spin" />
            )}
          </div>

          {/* Ripple effect */}
          {status !== 'idle' && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-current opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-2 border-current opacity-20 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </>
          )}
        </button>

        {/* Status indicator */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
            {currentStatus.label}
          </p>
          {transcript && (
            <p className="text-slate-300 text-sm">{transcript}</p>
          )}
        </div>
      </div>

      {/* Messages Display */}
      {messages.length > 0 && (
        <div className="glass-dark rounded-lg p-6 space-y-4 max-h-96 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-500/50 text-slate-100'
                    : 'bg-slate-800/50 border border-slate-700/50 text-slate-300'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}

          {/* AI Response with play button */}
          {messages.length > 0 && messages[messages.length - 1].type === 'ai' && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handlePlayResponse}
                disabled={status === 'speaking'}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 smooth-transition disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                {status === 'speaking' ? 'Playing...' : 'Play Response'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {messages.length === 0 && (
        <div className="glass-dark rounded-lg p-8 text-center space-y-3 border-dashed border-2 border-slate-700/50">
          <p className="text-slate-400">No conversation yet</p>
          <p className="text-sm text-slate-500">Click the mic button above to start your learning session</p>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { ChatMessage, type ChatMessageProps } from './chat-message';
import { ScrollArea } from '@/components/ui/scroll-area';

const INITIAL_MESSAGES: ChatMessageProps[] = [
  {
    id: '1',
    role: 'ai',
    content: "Greetings. I am LION, your advanced digital twin assistant. Systems are fully operational. How may I assist you with your campus navigation, schedules, or facility data today?",
    timestamp: new Date()
  }
];

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessageProps[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newUserMsg: ChatMessageProps = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      const newAIMsg: ChatMessageProps = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: data.response || "Sorry, I couldn't understand that.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAIMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessageProps = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `Error: ${err.message}. Please ensure the GEMINI_API_KEY is correctly set in your environment.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px] w-full max-w-4xl mx-auto glass-panel rounded-3xl border border-border overflow-hidden shadow-xl shadow-[#6C63FF]/5">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-white/5 bg-black/40 backdrop-blur-xl z-10 relative">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <Bot className="w-6 h-6 text-white relative z-10 drop-shadow-md" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-3 tracking-wide">
            LION
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] uppercase tracking-widest font-bold border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">System Online</span>
          </h2>
          <p className="text-xs text-indigo-200/70 font-mono tracking-wider">L.I.O.N. CORE v2.4.1</p>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 min-h-0 relative">
        <div className="space-y-2 p-6 pb-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          
          {isTyping && (
            <div className="flex w-full gap-4 py-4 flex-row">
              <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.3)] bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col max-w-[80%] items-start">
                <div className="px-4 py-3 rounded-2xl text-sm shadow-sm bg-muted/50 border border-border text-foreground rounded-tl-sm flex items-center gap-2 font-mono">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  <span className="text-muted-foreground text-xs">LION is processing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-card/30 backdrop-blur-md border-t border-border mt-auto">
        <div className="relative flex items-center bg-background border border-border rounded-2xl p-1 shadow-inner focus-within:ring-2 focus-within:ring-[#6C63FF]/20 focus-within:border-[#6C63FF]/50 transition-all">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about campus facilities, navigation, or schedules..."
            className="flex-1 bg-transparent border-none text-sm px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground/70"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="w-10 h-10 shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-2 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-muted-foreground/60">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}

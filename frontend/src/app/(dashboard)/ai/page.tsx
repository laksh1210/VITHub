import React from 'react';
import { ChatInterface } from '@/components/ai/chat-interface';

export default function AIAssistantPage() {
  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">LION</h1>
        <p className="text-sm text-muted-foreground font-mono mt-1">Logical Interactive Operations Node</p>
      </div>
      
      <div className="flex-1 w-full max-w-6xl mx-auto flex items-center justify-center">
        <ChatInterface />
      </div>
    </div>
  );
}

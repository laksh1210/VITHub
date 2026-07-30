import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function ChatMessage({ message }: { message: ChatMessageProps }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex w-full gap-4 py-4", isUser ? "flex-row-reverse" : "flex-row")}>
      <div 
        className={cn(
          "w-8 h-8 shrink-0 rounded-full flex items-center justify-center shadow-sm",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_10px_rgba(99,102,241,0.3)] text-white"
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div 
        className={cn(
          "flex flex-col max-w-[80%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div 
          className={cn(
            "px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-sm" 
              : "bg-muted/40 border border-white/5 text-foreground rounded-tl-sm font-mono text-[13px] leading-relaxed shadow-inner"
          )}
        >
          {message.content}
        </div>
        <span className="text-[10px] text-muted-foreground mt-1.5 px-1 font-medium">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

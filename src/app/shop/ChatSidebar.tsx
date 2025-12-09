"use client";

import { MessageCircle, Send, Trash2, X, MessageSquare } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 How can I help you find the perfect product today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsLoading(true);
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'm here to help with product recommendations.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hi! 👋 How can I help you find the perfect product today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      <button
        className="fixed top-20 left-4 z-50 md:hidden bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={20} />
      </button>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`sticky top-20 h-[80vh] w-full bg-white border-l border-muted shadow-xl z-50 flex flex-col transition-transform duration-300 rounded-md
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-muted">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              Chat Assistant
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className="text-muted-foreground hover:text-foreground transition p-1"
              title="Clear chat"
            >
              <Trash2 size={16} />
            </button>
            <button
              className="md:hidden text-muted-foreground hover:text-foreground transition p-1"
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${message.isUser
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground"
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground px-3 py-2 rounded-lg text-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-muted flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-muted rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send size={18} />
          </button>
        </form>
      </aside>
    </>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, HelpCircle, RefreshCw, ChevronRight, CheckCircle2, Cpu } from 'lucide-react';
import { classifyUserQuery, synthesizeNeuralResponse } from '../../../services/aiNLMEngine';

interface ChatMessage {
  id: string;
  sender: 'AI' | 'USER';
  text: string;
  timestamp: string;
  evidenceTags?: string[];
  suggestedTab?: string;
  suggestedTabName?: string;
}

interface PromptCategory {
  category: string;
  prompts: string[];
}

const FAQ_CATEGORIES: PromptCategory[] = [
  {
    category: '🔰 Beginner & App Basics',
    prompts: [
      'What is investing and what is it used for?',
      'How to start investing on the VITTIYA platform?',
      'How do I search for stocks like Navin Fluorine or Tata Steel?'
    ]
  },
  {
    category: '📊 Stock Analysis & IPOs',
    prompts: [
      'what about NavinFluorine stock is it good to invest now',
      'Which mainboard IPO has the highest GMP right now?',
      'What is Tata Steel live price and news sentiment?'
    ]
  },
  {
    category: '🧠 Advanced AI Causal Engine',
    prompts: [
      'How does the 3-tier District-to-Global Causal Brain work?',
      'How to calculate SIP compounding and USD conversion GST fees?',
      'What is the difference between short-term swing and long-term buy?'
    ]
  }
];

export const AIChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'AI',
      text: "Hello! I am **VITTIYA Enterprise Neural AI** — powered by an NLM/LLM Intent Classifier & Semantic Vector Engine.\n\nI can answer any question about **stock analysis (e.g. Navin Fluorine, Tata Steel, Reliance)**, **financial concepts (what is investing, compounding, P/E ratios)**, **IPO GMP ratings**, or **how to navigate this platform**.\n\nHow can I assist your financial journey today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      evidenceTags: ['Client-Side NLM Model', 'Vector Embeddings', 'Causal Brain OS']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      // 1. Run Neural Inference Pipeline via aiNLMEngine
      const classification = classifyUserQuery(userText);
      const response = synthesizeNeuralResponse(classification, userText);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        evidenceTags: response.tags,
        suggestedTab: response.tab,
        suggestedTabName: response.tabName
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-[750px] groww-card overflow-hidden rounded-3xl border border-[var(--border-color)] shadow-2xl">
      {/* 1. Header Bar */}
      <div className="p-5 border-b border-[var(--border-color)] bg-[var(--card-inner)] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00D09C] to-purple-600 flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-[#0A0E1A]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-extrabold text-base text-[var(--text-primary)] font-sans">
                AI Causal Chat & Financial Evidence Assistant
              </h2>
              <span className="w-2 h-2 rounded-full bg-[#00D09C] pulse-glow"></span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] font-mono flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#00D09C]" />
              <span>Trained NLM Vector Model • Intent Classifier & Entity Extractor Active</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          title="Reset Chat Session"
          className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#00D09C]"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Messages List Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[var(--bg-primary)]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 max-w-3xl ${
              msg.sender === 'USER' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                msg.sender === 'AI'
                  ? 'bg-gradient-to-tr from-[#00D09C] to-emerald-600 text-[#0A0E1A]'
                  : 'bg-indigo-600 text-white font-bold text-xs'
              }`}
            >
              {msg.sender === 'AI' ? <Bot className="w-5 h-5" /> : <User className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div
              className={`p-4 rounded-3xl text-xs leading-relaxed space-y-2 border transition-all ${
                msg.sender === 'USER'
                  ? 'bg-[#00D09C] text-[#0A0E1A] font-bold border-[#00D09C] rounded-tr-none'
                  : 'bg-[var(--card-inner)] text-[var(--text-primary)] border-[var(--border-color)] rounded-tl-none font-mono'
              }`}
            >
              <div className="whitespace-pre-line font-sans leading-relaxed">{msg.text}</div>

              {/* Evidence Tags & Navigation Badges */}
              {msg.evidenceTags && msg.evidenceTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--border-color)]">
                  {msg.evidenceTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--card-bg)] text-[#00D09C] border border-[#00D09C]/40 font-bold flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#00D09C] mr-0.5" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}

              <div
                className={`text-[9px] font-mono text-right ${
                  msg.sender === 'USER' ? 'text-[#0A0E1A]/70' : 'text-[var(--text-secondary)]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 text-xs font-mono text-[#00D09C] bg-[var(--card-inner)] p-3 rounded-2xl border border-[var(--border-color)] w-fit">
            <Sparkles className="w-4 h-4 animate-spin text-[#00D09C]" />
            <span>Neural NLM Model is running inference on user input...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 3. Categorized Frequently Asked Question Chips */}
      <div className="px-6 py-3 bg-[var(--card-inner)] border-t border-[var(--border-color)] space-y-2">
        <div className="text-[10px] font-mono uppercase font-bold text-[var(--text-secondary)] flex items-center space-x-1">
          <HelpCircle className="w-3.5 h-3.5 text-[#00D09C]" />
          <span>Frequently Asked Enterprise Questions & Stock Analysis:</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-1">
          {FAQ_CATEGORIES.flatMap((cat) => cat.prompts).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuery(prompt);
              }}
              className="px-3 py-1.5 rounded-full bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#00D09C] border border-[var(--border-color)] text-[10px] font-mono whitespace-nowrap transition-all flex items-center space-x-1"
            >
              <span>{prompt}</span>
              <ChevronRight className="w-3 h-3 text-[#00D09C]" />
            </button>
          ))}
        </div>
      </div>

      {/* 4. Input Box */}
      <div className="p-4 bg-[var(--card-inner)] border-t border-[var(--border-color)] flex items-center space-x-3">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask enterprise NLM: 'what is investing and what is it used for', 'what about NavinFluorine stock is it good to invest now'..."
          className="flex-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl px-5 py-3 text-xs font-mono text-[var(--text-primary)] placeholder-slate-400 focus:outline-none focus:border-[#00D09C] transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!inputQuery.trim()}
          className="p-3 rounded-2xl bg-[#00D09C] text-[#0A0E1A] hover:bg-[#00D09C]/90 disabled:opacity-50 transition-all shadow-lg shrink-0"
        >
          <Send className="w-4 h-4 font-bold" />
        </button>
      </div>
    </div>
  );
};

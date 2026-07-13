import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { COMPANY } from "@/lib/company";

const SUGGESTIONS = [
  "What services do you provide?",
  "How can I contact you?",
  "Do you provide IT consulting?",
  "What industries do you serve?",
  "Can I request a quotation?",
];

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function useSessionId() {
  const [id] = useState(() => {
    const existing = sessionStorage.getItem("zj-chat-session");
    if (existing) return existing;
    const fresh = crypto.randomUUID();
    sessionStorage.setItem("zj-chat-session", fresh);
    return fresh;
  });
  return id;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hello 👋 I'm ZJ Assistant. Ask me anything about ${COMPANY.name} — services, industries, or how to get in touch.` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = useSessionId();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  async function send(text) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: msg }, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const res = await fetch(`${API}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: msg }),
      });
      if (!res.ok || !res.body) throw new Error("bad response");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trimStart();
          if (data === "[DONE]") continue;
          if (data.startsWith("[error]")) {
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { role: "assistant", content: `I'm temporarily unavailable. Please reach us at ${COMPANY.email} or via the Contact page — we typically reply the same business day.` };
              return copy;
            });
            continue;
          }
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = { role: "assistant", content: copy[copy.length - 1].content + data };
            return copy;
          });
        }
      }
    } catch (e) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: "Sorry — I couldn't reach the assistant right now. Please try again or visit the Contact page." };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        data-testid="chatbot-toggle"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 18 }}
        className="fixed bottom-6 right-6 z-[70] h-14 w-14 rounded-full bg-gradient-to-br from-[hsl(207_100%_42%)] to-[hsl(191_100%_45%)] text-white flex items-center justify-center shadow-[0_18px_40px_-10px_hsl(207_100%_45%_/_0.55)] pulse-glow"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="chatbot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-[69] w-[calc(100vw-3rem)] max-w-sm h-[560px] max-h-[75vh] rounded-2xl border border-border bg-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-br from-[hsl(214_60%_10%)] to-[hsl(207_100%_18%)] text-white">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-semibold text-sm">ZJ Assistant</div>
                  <div className="text-[11px] text-white/60 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · powered by AI
                  </div>
                </div>
                <Sparkles className="h-4 w-4 text-[hsl(191_100%_65%)]" />
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-secondary/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    data-testid={`chat-msg-${m.role}`}
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)] text-white rounded-br-sm"
                        : "bg-background border border-border text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.content || (loading && i === messages.length - 1 ? <TypingDots /> : null)}
                  </div>
                </div>
              ))}
            </div>

            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    data-testid={`chat-suggestion-${s.slice(0, 10)}`}
                    onClick={() => send(s)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-border bg-background">
              <div className="flex items-center gap-2">
                <input
                  data-testid="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about our services…"
                  className="flex-1 h-10 rounded-lg border border-border bg-secondary/40 px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  disabled={loading}
                />
                <button
                  data-testid="chat-send"
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="h-10 w-10 rounded-lg bg-gradient-to-br from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)] text-white flex items-center justify-center disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1">
      {[0, 0.15, 0.3].map((d, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: d }}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
        />
      ))}
    </span>
  );
}

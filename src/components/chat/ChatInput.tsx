import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled = false, placeholder = "Ask anything..." }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-premium p-2">
      <div className="flex items-end gap-2">
        <button
          type="button"
          className="flex-shrink-0 p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground py-2.5 px-1",
            "focus:ring-0 focus:outline-none",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className={cn(
            "flex-shrink-0 p-2.5 rounded-xl transition-all",
            value.trim() && !disabled
              ? "bg-accent text-accent-foreground hover:opacity-90 shadow-sm"
              : "text-muted-foreground cursor-not-allowed"
          )}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex items-center justify-between px-2 pt-2 border-t border-border mt-2">
        <p className="text-xs text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">Shift+Enter</kbd> for new line
        </p>
        <p className="text-xs text-muted-foreground">
          Explanation-first mode
        </p>
      </div>
    </div>
  );
}

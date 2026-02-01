import { Settings, History, HelpCircle } from "lucide-react";

export function ChatHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">C</span>
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Clarity with AI</h1>
            <p className="text-xs text-muted-foreground">Explanation-first assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Conversation history"
          >
            <History className="h-5 w-5" />
          </button>
          <button 
            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          <button 
            className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

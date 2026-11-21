import React, { useState } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const ChatInput = ({ onSendMessage, isWaiting }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [showVoiceNotice, setShowVoiceNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isWaiting) return;
    onSendMessage(text);
    setText('');
  };

  const handleVoiceClick = () => {
    setShowVoiceNotice(true);
    setTimeout(() => setShowVoiceNotice(false), 3500);
  };

  return (
    <div className="relative">
      {/* Voice Future Notice Toast */}
      {showVoiceNotice && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[11px] px-3 py-1.5 rounded-lg shadow-hover z-20 flex items-center gap-1.5 animate-in fade-in duration-150">
          <Mic className="w-3.5 h-3.5 text-forest-300" />
          <span>{t('assistant.voicePlaceholder')}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-2 shadow-subtle focus-within:border-forest-900 focus-within:ring-1 focus-within:ring-forest-900 transition-all">
        {/* Future Voice Input Button */}
        <button
          type="button"
          onClick={handleVoiceClick}
          className="p-2 text-slate-400 hover:text-forest-800 hover:bg-forest-50 rounded-lg transition-colors"
          title="Voice Input (Speech-to-text in Telugu & Hindi)"
          aria-label="Voice input"
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Input box */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('assistant.placeholder')}
          className="flex-1 text-xs text-charcoal placeholder-slate-400 bg-transparent focus:outline-none px-2"
          disabled={isWaiting}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() || isWaiting}
          className={`px-3.5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
            !text.trim() || isWaiting
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-forest-900 hover:bg-forest-800 text-white shadow-subtle'
          }`}
        >
          {isWaiting ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

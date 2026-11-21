import React from 'react';
import { Sparkles, MessageCircleQuestion } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const QuickQuestions = ({ onSelectQuestion }) => {
  const { t } = useTranslation();
  const questions = t('assistant.quickQuestions') || [];

  if (!Array.isArray(questions) || questions.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-mutedgrey uppercase tracking-wider">
        <MessageCircleQuestion className="w-3.5 h-3.5 text-forest-700" />
        <span>{t('assistant.quickQuestionsTitle')}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectQuestion(q)}
            className="text-left text-xs px-3 py-1.5 bg-white border border-slate-200/90 hover:border-forest-700 hover:bg-forest-50/50 rounded-lg text-slate-700 hover:text-forest-900 transition-colors shadow-subtle"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

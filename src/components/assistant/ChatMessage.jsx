import React from 'react';
import { Bot, User, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const ChatMessage = ({ message }) => {
  const { t, language } = useTranslation();
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-3 ${isAssistant ? 'items-start' : 'items-start flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-subtle ${
        isAssistant ? 'bg-forest-900 text-white' : 'bg-slate-200 text-charcoal'
      }`}>
        {isAssistant ? <Bot className="w-4 h-4 text-forest-300" /> : <User className="w-4 h-4 text-slate-700" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-2xl rounded-2xl p-4 text-xs shadow-subtle transition-all ${
        isAssistant
          ? 'bg-white border border-slate-200 text-charcoal'
          : 'bg-forest-900 text-white rounded-tr-none'
      }`}>
        {!isAssistant ? (
          <p className="leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
        ) : (
          <div className="space-y-4">
            {/* Direct Answer */}
            <div>
              <div className="flex items-center gap-1.5 text-forest-900 font-bold uppercase tracking-wider text-[11px] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                <span>{t('assistant.sections.directAnswer')}</span>
              </div>
              <p className="text-charcoal font-semibold text-xs leading-relaxed">
                {message.data?.directAnswer || message.content}
              </p>
            </div>

            {/* Explanation */}
            {message.data?.explanation && (
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-700 text-[11px] block mb-1">
                  {t('assistant.sections.explanation')}:
                </span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {message.data.explanation}
                </p>
              </div>
            )}

            {/* Precautions */}
            {message.data?.precautions && (
              <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-amber-950">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-amber-900 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t('assistant.sections.precautions')}</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {message.data.precautions}
                </p>
              </div>
            )}

            {/* Next Steps */}
            {message.data?.nextSteps && (
              <div className="p-3 rounded-lg bg-forest-50/50 border border-forest-100 text-forest-950">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-forest-900 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                  <span>{t('assistant.sections.nextSteps')}</span>
                </div>
                <div className="text-[11px] leading-relaxed whitespace-pre-wrap font-medium">
                  {message.data.nextSteps}
                </div>
              </div>
            )}

            {/* Scientific Source Reference */}
            {message.data?.source && (
              <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-[10px] text-mutedgrey">
                <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="italic leading-tight">
                  <strong className="not-italic text-slate-600 font-semibold">{t('assistant.sections.source')}: </strong>
                  {message.data.source}
                </span>
              </div>
            )}
          </div>
        )}

        <div className={`mt-2 text-[10px] ${isAssistant ? 'text-slate-400' : 'text-forest-200'} text-right`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Plus, MessageSquare, Trash2, Calendar, Bot, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export const ChatSidebar = ({ conversations, activeId, onSelect, onNewChat, isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/40 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed md:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header & New Chat button */}
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={onNewChat}
            className="w-full py-2.5 px-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-subtle transition-all"
          >
            <Plus className="w-4 h-4 text-forest-300" />
            <span>{t('assistant.newChat')}</span>
          </button>
        </div>

        {/* Previous Conversations List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-mutedgrey">
            {t('assistant.chatHistory')}
          </p>

          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                onSelect(chat.id);
                if (window.innerWidth < 768) onClose();
              }}
              className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors flex items-start gap-2.5 ${
                activeId === chat.id
                  ? 'bg-forest-50/80 text-forest-900 font-semibold border border-forest-200'
                  : 'text-slate-700 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <MessageSquare className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                activeId === chat.id ? 'text-forest-700' : 'text-slate-400'
              }`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs">{chat.title}</p>
                <span className="text-[10px] text-mutedgrey block mt-0.5">
                  {chat.date}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[10px] text-mutedgrey flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-forest-700 shrink-0" />
          <span>Responses referenced from ICAR, ANGRAU & PJTSAU research.</span>
        </div>
      </div>
    </>
  );
};

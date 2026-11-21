import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ChatSidebar } from '../components/assistant/ChatSidebar';
import { ChatMessage } from '../components/assistant/ChatMessage';
import { ChatInput } from '../components/assistant/ChatInput';
import { QuickQuestions } from '../components/assistant/QuickQuestions';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { useTranslation } from '../i18n/LanguageContext';
import { apiService } from '../services/api';
import { Bot, PanelLeft, Sparkles, Info, ShieldAlert } from 'lucide-react';

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    title: 'Paddy Blast Identification & Treatment',
    date: 'Today, 10:30 AM',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Why are my crop leaves turning yellow and showing spindle shaped spots?',
        timestamp: '10:30 AM'
      },
      {
        id: 'm2',
        role: 'assistant',
        timestamp: '10:31 AM',
        content: 'Your crop is showing symptoms of nutrient deficiency coupled with possible Rice Blast.',
        data: {
          directAnswer: "Yellowing leaves with spindle-shaped lesions in paddy indicate nitrogen deficiency combined with early Rice Blast (Magnaporthe oryzae).",
          explanation: "Nitrogen deficiency causes general chlorosis starting from the basal foliage. Under high humidity (>90%) and continuous dew, blast fungus attacks the weakened leaf blade creating diamond/spindle spots with grey centers.",
          precautions: "Do not apply excess urea right now. High free nitrogen in the plant sap increases cell vulnerability to fungal penetration.",
          nextSteps: "1. Drain standing water to reduce field humidity.\n2. Apply recommended tricyclazole or consult local Mandal Agricultural Officer.\n3. Resume balanced fertilizer in split doses once blast symptoms stop spreading.",
          source: "Acharya N.G. Ranga Agricultural University (ANGRAU) & PJTSAU Crop Protection Compendium."
        }
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'Water Management for Kharif Paddy',
    date: 'Yesterday, 03:15 PM',
    messages: [
      {
        id: 'm2-1',
        role: 'user',
        content: 'How can I manage water requirements for paddy?',
        timestamp: '03:15 PM'
      },
      {
        id: 'm2-2',
        role: 'assistant',
        timestamp: '03:16 PM',
        content: 'Adopt Alternate Wetting and Drying (AWD) to optimize irrigation.',
        data: {
          directAnswer: "Implement Alternate Wetting and Drying (AWD) rather than continuous submergence to save 25-30% irrigation water.",
          explanation: "Continuous ponding is unnecessary during tillering and increases root asphyxiation. AWD allows oxygenation of the root zone, fostering deeper root architecture and reducing methane emissions.",
          precautions: "Never allow soil to dry to cracking stage during panicle emergence and flowering, which causes severe grain sterility.",
          nextSteps: "1. Install a perforated field water tube.\n2. Re-irrigate to 5cm depth only when water drops 15cm below soil surface.",
          source: "International Rice Research Institute (IRRI) & PJTSAU Water Technology Centre."
        }
      }
    ]
  }
];

export const Assistant = () => {
  const { t, language } = useTranslation();
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation.messages]);

  const handleSendMessage = async (text) => {
    const userMsg = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...activeConversation.messages, userMsg];
    
    // Update local conversation state immediately
    setConversations(prev => prev.map(c => c.id === activeConvId ? { ...c, messages: updatedMessages } : c));
    setIsWaiting(true);

    try {
      const res = await apiService.assistantChat(text, language);
      const assistantData = res.data;

      const assistantMsg = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: assistantData.directAnswer,
        data: assistantData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => prev.map(c => c.id === activeConvId ? { ...c, messages: [...updatedMessages, assistantMsg] } : c));
    } catch (err) {
      console.error(err);
    } finally {
      setIsWaiting(false);
    }
  };

  const handleNewChat = () => {
    const newId = 'conv-' + Date.now();
    const newChat = {
      id: newId,
      title: language === 'te' ? 'కొత్త వ్యవసాయ సంభాషణ' : language === 'hi' ? 'नया कृषि संवाद' : 'New Consultation',
      date: 'Just now',
      messages: []
    };
    setConversations([newChat, ...conversations]);
    setActiveConvId(newId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header bar with Language Selector */}
        <div className="pb-3 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle history"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-forest-100 rounded-lg text-forest-900">
                  <Bot className="w-5 h-5 text-forest-700" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-charcoal tracking-tight">
                  {t('assistant.title')}
                </h1>
              </div>
              <p className="text-xs text-mutedgrey mt-0.5">
                {t('assistant.subtitle')}
              </p>
            </div>
          </div>

          {/* Prominent Language Switcher */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-1 rounded-xl border border-slate-200 shadow-subtle">
            <span className="text-xs text-mutedgrey font-medium pl-2 hidden sm:inline">
              {t('assistant.activeLanguage')}
            </span>
            <LanguageSelector variant="pill-group" />
          </div>
        </div>

        {/* Chat Window Frame */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden flex h-[720px] relative">
          {/* Left Chat History Sidebar */}
          <ChatSidebar
            conversations={conversations}
            activeId={activeConvId}
            onSelect={(id) => setActiveConvId(id)}
            onNewChat={handleNewChat}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-offwhite/50">
            {/* Active conversation title bar */}
            <div className="px-5 py-3 border-b border-slate-200/80 bg-white flex items-center justify-between text-xs">
              <span className="font-bold text-charcoal truncate max-w-sm">
                {activeConversation.title}
              </span>
              <span className="text-[11px] text-forest-800 bg-forest-50 px-2 py-0.5 rounded font-medium">
                Verified Scientific Advisory
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {activeConversation.messages.length === 0 ? (
                <div className="py-12 text-center max-w-md mx-auto space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-900">
                    <Sparkles className="w-7 h-7 text-forest-700" />
                  </div>
                  <h3 className="font-bold text-charcoal text-base">
                    {language === 'te' ? 'మీ వ్యవసాయ ప్రశ్నను అడగండి' : language === 'hi' ? 'अपना कृषि प्रश्न पूछें' : 'How can AGRI-MIND assist your farm today?'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'te'
                      ? 'వరి, మిరప, పత్తి పంటల తెగుళ్లు, నేల పోషకాలు మరియు వాతావరణ సలహాల కోసం తెలుగులోనే అడగండి.'
                      : language === 'hi'
                      ? 'धान, मिर्च, कपास के रोगों, पोषण और मौसम परामर्श हेतु सीधे हिंदी में प्रश्न पूछें।'
                      : 'Ask about crop pest diagnosis, balanced N-P-K fertilizer schedules, or weather mitigation strategies in English, Telugu, or Hindi.'}
                  </p>
                </div>
              ) : (
                activeConversation.messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))
              )}

              {isWaiting && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 max-w-xs animate-pulse">
                  <div className="w-3.5 h-3.5 border-2 border-forest-600 border-t-transparent rounded-full animate-spin" />
                  <span>Consulting agronomic knowledge base...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Controls Area */}
            <div className="p-4 bg-white border-t border-slate-200/80 space-y-3">
              {/* Suggested Quick Inquiries */}
              <QuickQuestions onSelectQuestion={(q) => handleSendMessage(q)} />

              {/* Chat Input */}
              <ChatInput onSendMessage={handleSendMessage} isWaiting={isWaiting} />

              {/* Legal Disclaimer */}
              <p className="text-[10px] text-mutedgrey text-center">
                {t('assistant.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Bot, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getBotResponse } from '../../api/ml_models';

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { from: 'bot', text: t('chatbot.greeting') }
      ]);
    }
  }, [isOpen, t]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = { from: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate thinking
    setTimeout(async () => {
        const botResponseKey = await getBotResponse(inputValue);
        const translatedResponse = t(`chatbot.query.${botResponseKey}`, {
            defaultValue: t('chatbot.default_response')
        });
        
        const botMessage = { from: 'bot', text: translatedResponse };
        setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-primary p-4 text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-primary-dark animate-pulse"
        >
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-80 animate-fadeIn rounded-lg border border-gray-300 bg-surface shadow-xl sm:w-96">
          <div className="flex items-center justify-between rounded-t-lg bg-slate-100 p-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Bot className="text-primary"/> {t('chatbot.title')}
            </h3>
          </div>
          <div className="h-80 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs rounded-lg px-3 py-2 ${
                    msg.from === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-slate-200 text-text'
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex items-center border-t border-gray-200 p-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chatbot.placeholder')}
              className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
            />
            <button onClick={handleSend} className="ml-2 rounded-md bg-primary p-2 text-white transition-colors hover:bg-primary-dark">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

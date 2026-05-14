import React from 'react';
import { Heart, Gift, Sparkles } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <div className="glass-panel text-center animate-fade-in mt-8 mb-8">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Heart size={64} className="text-primary animate-pulse" fill="currentColor" />
          <Sparkles size={24} className="text-secondary absolute -top-2 -right-2 animate-bounce" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl mb-4 text-gradient">
        Язык Любви: Подбор Подарков
      </h1>
      
      <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
        Откройте для себя идеальный подарок для вашего близкого человека, основанный на его уникальном "языке любви" и интересах, с помощью искусственного интеллекта.
      </p>
      
      <button className="btn btn-primary text-lg px-8 py-4" onClick={onStart}>
        <Gift size={20} />
        Подобрать идеальный подарок
      </button>
      
      <div className="mt-8 flex justify-center gap-4 text-sm text-muted">
        <div className="flex items-center gap-1">
          <Heart size={16} className="text-primary" /> Эмоциональная связь
        </div>
        <div className="flex items-center gap-1">
          <Sparkles size={16} className="text-secondary" /> ИИ Анализ
        </div>
      </div>
    </div>
  );
};

export default Hero;

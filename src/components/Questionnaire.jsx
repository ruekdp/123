import React, { useState } from 'react';
import { Send, User, Calendar, Heart, Sparkles, Tag, Banknote } from 'lucide-react';

const Questionnaire = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    relationship: '',
    occasion: '',
    interests: '',
    loveLanguage: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="glass-panel animate-fade-in max-w-2xl mx-auto w-full">
      <h2 className="text-4xl mb-2 text-gradient text-center">Анкета предпочтений</h2>
      <p className="text-center text-muted mb-8">Расскажите немного о человеке, чтобы ИИ смог подобрать идеальный подарок.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="form-group flex-1">
            <label className="form-label flex items-center gap-2">
              <User size={18} className="text-primary"/> Имя
            </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="form-input" 
              placeholder="Например: Анна"
              required
            />
          </div>
          
          <div className="form-group flex-1">
            <label className="form-label flex items-center gap-2">
              <Tag size={18} className="text-secondary"/> Возраст
            </label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              className="form-input" 
              placeholder="Например: 25"
            />
          </div>
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <div className="form-group flex-1">
            <label className="form-label flex items-center gap-2">
              <Heart size={18} className="text-primary"/> Кем приходится
            </label>
            <input 
              type="text" 
              name="relationship" 
              value={formData.relationship} 
              onChange={handleChange} 
              className="form-input" 
              placeholder="Жена, друг, коллега..."
            />
          </div>
          
          <div className="form-group flex-1">
            <label className="form-label flex items-center gap-2">
              <Calendar size={18} className="text-secondary"/> Повод
            </label>
            <input 
              type="text" 
              name="occasion" 
              value={formData.occasion} 
              onChange={handleChange} 
              className="form-input" 
              placeholder="День рождения, годовщина..."
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label flex items-center gap-2">
            <Sparkles size={18} className="text-primary"/> Интересы и хобби
          </label>
          <textarea 
            name="interests" 
            value={formData.interests} 
            onChange={handleChange} 
            className="form-textarea" 
            placeholder="Любит готовить, читает фэнтези, занимается йогой..."
            required
          />
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <div className="form-group flex-1">
            <label className="form-label flex items-center gap-2">
              <Heart size={18} className="text-secondary" fill="currentColor"/> Язык любви (если знаете)
            </label>
            <select 
              name="loveLanguage" 
              value={formData.loveLanguage} 
              onChange={handleChange} 
              className="form-select"
            >
              <option value="">Не уверен(а) / Сделайте микс</option>
              <option value="Слова поощрения">Слова поощрения (комплименты, письма)</option>
              <option value="Качественное время">Качественное время (быть вместе, общаться)</option>
              <option value="Получение подарков">Получение подарков (видимые символы любви)</option>
              <option value="Акты служения">Акты служения (помощь, забота)</option>
              <option value="Физическое прикосновение">Физическое прикосновение (объятия, массаж)</option>
            </select>
          </div>

          <div className="form-group flex-1">
            <label className="form-label flex items-center gap-2">
              <Banknote size={18} className="text-primary"/> Бюджет
            </label>
            <input 
              type="text" 
              name="budget" 
              value={formData.budget} 
              onChange={handleChange} 
              className="form-input" 
              placeholder="Например: до 20 000 тг"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4 w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Sparkles className="animate-pulse" size={20} />
              ИИ анализирует...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send size={20} />
              Найти идеальный подарок
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Questionnaire;

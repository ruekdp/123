import React, { useState } from 'react';
import Hero from './components/Hero';
import Questionnaire from './components/Questionnaire';
import GiftRecommendations from './components/GiftRecommendations';
import { getGiftRecommendations } from './api/alemPlus';

function App() {
  const [step, setStep] = useState('hero'); // 'hero', 'questionnaire', 'recommendations'
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);

  const handleStart = () => {
    setStep('questionnaire');
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getGiftRecommendations(formData);
      setRecommendations(result);
      setStep('recommendations');
    } catch (err) {
      setError('Не удалось получить рекомендации. Проверьте подключение или токен.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep('hero');
    setRecommendations(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <header className="mb-8 flex justify-center">
        <div className="text-2xl font-bold font-outfit text-primary tracking-wider">
          GIFT<span className="text-white">AI</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        {step === 'hero' && <Hero onStart={handleStart} />}
        
        {step === 'questionnaire' && (
          <Questionnaire onSubmit={handleSubmit} isLoading={isLoading} />
        )}

        {error && step === 'questionnaire' && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center max-w-2xl w-full">
            {error}
          </div>
        )}

        {step === 'recommendations' && (
          <GiftRecommendations 
            recommendations={recommendations} 
            onReset={handleReset} 
          />
        )}
      </main>

      <footer className="mt-12 text-center text-muted text-sm pb-8">
        Создано с любовью вашим личным помощником по подаркам &copy; 2026
      </footer>
    </div>
  );
}

export default App;

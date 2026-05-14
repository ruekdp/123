import React from 'react';
import { Gift, Sparkles, RefreshCw, Heart, ShoppingCart, BarChart3, Info } from 'lucide-react';

const GiftRecommendations = ({ recommendations, onReset }) => {
  // Parsing logic to split by numeric list (1. 2. etc)
  const giftBlocks = recommendations.split(/\n(?=\d+\.)/).filter(block => block.trim().length > 5);

  const renderGiftCard = (block, index) => {
    // Clean asterisks
    const cleanText = block.replace(/\*\*/g, '').trim();
    
    // Extract Name (first line)
    const lines = cleanText.split('\n').filter(l => l.trim() !== '');
    const title = lines[0].replace(/^\d+\.\s*/, '');
    
    // Extract Image Query
    const imageMatch = cleanText.match(/IMAGE_QUERY:\s*\[?(.*?)\]?$/m);
    const query = imageMatch ? imageMatch[1].trim() : title;
    
    // Generate image URL
    const imageUrl = `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(query)}`;

    // Group remaining lines by keywords
    const content = lines.slice(1).filter(l => !l.includes('IMAGE_QUERY:'));

    return (
      <div key={index} className="glass-panel mb-12 animate-fade-in overflow-hidden" style={{ animationDelay: `${index * 150}ms`, padding: '0' }}>
        <div className="relative h-72 w-full">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1513885535751-8b9238cd48?q=80&w=800&auto=format&fit=crop'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-3xl font-bold text-white mb-1">{title}</h3>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          {content.map((line, lIdx) => {
            const isWhereToBuy = line.toLowerCase().includes('где купить') || line.toLowerCase().includes('ссылк');
            const isStats = line.toLowerCase().includes('статистика') || line.toLowerCase().includes('сравн') || line.toLowerCase().includes('дешевле');
            const isDesc = !isWhereToBuy && !isStats;

            return (
              <div key={lIdx} className={`flex gap-4 ${isDesc ? 'mb-4' : 'p-4 rounded-xl bg-white/5 border border-white/5'}`}>
                <div className="mt-1">
                  {isDesc && <Info size={20} className="text-primary" />}
                  {isWhereToBuy && <ShoppingCart size={20} className="text-secondary" />}
                  {isStats && <BarChart3 size={20} className="text-accent" />}
                </div>
                <div className="flex-1">
                  <p className={`text-lg leading-relaxed ${isDesc ? 'text-white' : 'text-slate-300'}`}>
                    {line}
                  </p>
                  {isWhereToBuy && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      <a href={`https://kaspi.kz/shop/search/?text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" className="btn btn-secondary py-2 px-4 text-sm">Kaspi.kz</a>
                      <a href={`https://www.wildberries.kz/catalog/0/search.aspx?search=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" className="btn btn-secondary py-2 px-4 text-sm">Wildberries</a>
                      <a href={`https://www.ozon.kz/search/?text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" className="btn btn-secondary py-2 px-4 text-sm">Ozon</a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto w-full px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Gift size={64} className="text-primary" />
            <Sparkles size={28} className="text-secondary absolute -top-2 -right-6 animate-bounce" />
          </div>
        </div>
        <h2 className="text-5xl mb-4 text-gradient">Ваши идеальные подарки</h2>
        <p className="text-xl text-muted">Мы проанализировали всё и нашли лучшее:</p>
      </div>

      <div className="gifts-list">
        {giftBlocks.length > 0 ? (
          giftBlocks.map((block, idx) => renderGiftCard(block, idx))
        ) : (
          <div className="glass-panel p-8 text-white whitespace-pre-wrap leading-loose text-lg">
            {recommendations.replace(/\*\*/g, '')}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-6 flex-col sm:flex-row mt-12 pb-20">
        <button className="btn btn-primary text-lg" onClick={() => window.print()}>
          <Heart size={22} />
          Сохранить список
        </button>
        <button className="btn btn-secondary text-lg" onClick={onReset}>
          <RefreshCw size={22} />
          Начать заново
        </button>
      </div>
    </div>
  );
};

export default GiftRecommendations;

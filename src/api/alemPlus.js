const ALEM_API_URL = 'https://llm.alem.ai/v1/chat/completions';
// Support both Vite (frontend) and Node.js (bot) environment variables
const ALEM_API_TOKEN = import.meta.env?.VITE_ALEM_API_TOKEN || process.env.ALEM_API_TOKEN;

export const getGiftRecommendations = async (personData) => {
  const { name, age, relationship, occasion, interests, loveLanguage, budget, lang = 'ru' } = personData;

  const languageName = lang === 'kk' ? 'казахский' : lang === 'en' ? 'английский' : 'русский';

  const prompt = `
Ты — эксперт по подбору подарков. Твоя задача — предложить 5 идеальных подарков для человека.

ВАЖНО: Твой ответ должен быть полностью на языке: ${languageName.toUpperCase()}.

Вот информация:
- Имя: ${name || 'Не указано'}
- Возраст: ${age || 'Не указано'}
- Кем приходится: ${relationship || 'Не указано'}
- Повод: ${occasion || 'Без повода'}
- Интересы: ${interests || 'Не указано'}
- Язык любви: ${loveLanguage || 'Неизвестно'}
- Бюджет: ${budget || 'Не ограничен'}

Для КАЖДОГО подарка строго соблюдай следующий формат:

ПОДАРОК: [Название подарка]
ОПИСАНИЕ: [Почему это подходит, 1-2 предложения]
СТАТИСТИКА: [Где обычно дешевле и больше отзывов: Kaspi, WB или Ozon]
IMAGE_QUERY: [Краткое описание предмета на английском для поиска фото]

ВАЖНО: 
- НЕ ИСПОЛЬЗУЙ жирный шрифт, символы ** или другие знаки разметки.
- РАЗДЕЛЯЙ подарки пустой строкой.
- ОТВЕЧАЙ НА ЯЗЫКЕ: ${languageName.toUpperCase()}.
`;

  try {
    const response = await fetch(ALEM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ALEM_API_TOKEN}`
      },
      body: JSON.stringify({
        model: 'alemllm',
        messages: [
          {
            role: 'system',
            content: 'Ты полезный ассистент, который помогает подбирать креативные и персонализированные подарки.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching recommendations from ALEM PLUS API:', error);
    throw error;
  }
};

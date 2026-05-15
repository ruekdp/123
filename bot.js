import { Telegraf, session, Markup } from 'telegraf';
import * as dotenv from 'dotenv';
import { getGiftRecommendations } from './src/api/alemPlus.js';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Use persistent session logic if possible, but for now memory session
bot.use(session());

const TRANSLATIONS = {
  ru: {
    welcome: 'Привет! Я помогу тебе подобрать идеальный подарок на основе "языка любви". ❤️\n\nВыбери язык / Тілді таңдаңыз / Select language:',
    askName: 'Как зовут человека, для которого ищем подарок?',
    askAge: 'А сколько ему/ей лет?',
    askRelationship: 'Кем он/она тебе приходится?',
    askOccasion: 'По поводку ищем подарок?',
    askInterests: 'Расскажи об интересах и хобби этого человека. Что он/она любит?',
    askLoveLanguage: 'Выбери основной язык любви этого человека:',
    askBudget: 'Какой у тебя бюджет? (например: до 10 000 тг)',
    processing: 'Ищу идеальные подарки для вас... Подождите немного 🪄',
    done: 'Надеюсь, эти идеи тебе понравились! Напиши /start для нового подбора. 😊',
    error: 'Произошла ошибка. Попробуй позже.',
    buyKaspi: 'Kaspi.kz 🇰🇿',
    buyWB: 'Wildberries 🟣',
    buyOzon: 'Ozon 🔵',
    loveLangs: ['Слова поощрения', 'Качественное время', 'Получение подарков', 'Акты служения', 'Физическое прикосновение', 'Микс'],
    relButtons: ['Жена', 'Муж', 'Девушка', 'Парень', 'Друг', 'Подруга', 'Коллега', 'Мама', 'Папа'],
    occButtons: ['День рождения', 'Годовщина', '8 марта', 'Новый год', 'Просто так']
  },
  kk: {
    welcome: 'Сәлем! Мен саған "махаббат тілі" негізінде керемет сыйлық таңдауға көмектесемін. ❤️\n\nТілді таңдаңыз:',
    askName: 'Сыйлық іздеп жатқан адамның есімі кім?',
    askAge: 'Ол неше жаста?',
    askRelationship: 'Ол саған кім болады?',
    askOccasion: 'Сыйлық қандай жағдайға байланысты? (туған күн, мерейтой...)',
    askInterests: 'Бұл адамның қызығушылықтары мен хоббиі туралы айтып берші.',
    askLoveLanguage: 'Оның негізгі махаббат тілін таңдаңыз:',
    askBudget: 'Сенің бюджетің қандай? (мысалы: 10 000 тг-ге дейін)',
    processing: 'Сіз үшін ең жақсы сыйлықтарды іздеп жатырмын... Сәл күте тұрыңыз 🪄',
    done: 'Бұл идеялар саған ұнайды деп үміттенемін! Жаңадан бастау үшін /start деп жаз. 😊',
    error: 'Қате орын алды. Кейінірек қайталап көр.',
    buyKaspi: 'Kaspi.kz 🇰🇿',
    buyWB: 'Wildberries 🟣',
    buyOzon: 'Ozon 🔵',
    loveLangs: ['Мақтау сөздер', 'Сапалы уақыт', 'Сыйлық алу', 'Көмек көрсету', 'Жанасу', 'Аралас'],
    relButtons: ['Әйелі', 'Күйеуі', 'Қызы', 'Жігіті', 'Досы', 'Әріптесі', 'Анасы', 'Әкесі'],
    occButtons: ['Туған күн', 'Мерейтой', '8 наурыз', 'Жаңа жыл', 'Жайдан-жай']
  },
  en: {
    welcome: 'Hi! I will help you find the perfect gift based on the "love language". ❤️\n\nSelect language:',
    askName: 'What is the name of the person we are looking for a gift for?',
    askAge: 'How old is he/she?',
    askRelationship: 'Who is this person to you?',
    askOccasion: 'What is the occasion? (birthday, anniversary, just because...)',
    askInterests: 'Tell me about this person\'s interests and hobbies. What do they like?',
    askLoveLanguage: 'Select the primary love language of this person:',
    askBudget: 'What is your budget? (e.g., up to $100)',
    processing: 'Searching for the perfect gifts for you... Please wait a moment 🪄',
    done: 'I hope you liked these ideas! Type /start to start over. 😊',
    error: 'An error occurred. Please try again later.',
    buyKaspi: 'Kaspi.kz 🇰🇿',
    buyWB: 'Wildberries 🟣',
    buyOzon: 'Ozon 🔵',
    loveLangs: ['Words of Affirmation', 'Quality Time', 'Receiving Gifts', 'Acts of Service', 'Physical Touch', 'Mix'],
    relButtons: ['Wife', 'Husband', 'Girlfriend', 'Boyfriend', 'Friend', 'Colleague', 'Mother', 'Father'],
    occButtons: ['Birthday', 'Anniversary', 'Christmas', 'Just Because']
  }
};

bot.start((ctx) => {
  ctx.session = { step: 'language', data: {} };
  ctx.reply(TRANSLATIONS.ru.welcome, 
    Markup.keyboard([['🇷🇺 Русский', '🇰🇿 Қазақша', '🇺🇸 English']]).oneTime().resize()
  );
});

bot.on('text', async (ctx) => {
  const step = ctx.session?.step;
  const text = ctx.message.text;
  if (!step) return ctx.reply('Напиши /start, чтобы начать заново.');

  if (step === 'language') {
    if (text.includes('Русский')) ctx.session.lang = 'ru';
    else if (text.includes('Қазақша')) ctx.session.lang = 'kk';
    else if (text.includes('English')) ctx.session.lang = 'en';
    else return ctx.reply('Please select language from the keyboard.');
    
    ctx.session.step = 'name';
    return ctx.reply(TRANSLATIONS[ctx.session.lang].askName, Markup.removeKeyboard());
  }

  const lang = ctx.session.lang || 'ru';
  const t = TRANSLATIONS[lang];

  switch (step) {
    case 'name':
      ctx.session.data.name = text;
      ctx.session.step = 'age';
      ctx.reply(t.askAge);
      break;

    case 'age':
      ctx.session.data.age = text;
      ctx.session.step = 'relationship';
      ctx.reply(t.askRelationship, 
        Markup.keyboard(t.relButtons.reduce((acc, curr, i) => {
          if (i % 3 === 0) acc.push([curr]); else acc[acc.length - 1].push(curr);
          return acc;
        }, [])).oneTime().resize()
      );
      break;

    case 'relationship':
      ctx.session.data.relationship = text;
      ctx.session.step = 'occasion';
      ctx.reply(t.askOccasion, 
        Markup.keyboard(t.occButtons.reduce((acc, curr, i) => {
          if (i % 2 === 0) acc.push([curr]); else acc[acc.length - 1].push(curr);
          return acc;
        }, [])).oneTime().resize()
      );
      break;

    case 'occasion':
      ctx.session.data.occasion = text;
      ctx.session.step = 'interests';
      ctx.reply(t.askInterests, Markup.removeKeyboard());
      break;

    case 'interests':
      ctx.session.data.interests = text;
      ctx.session.step = 'loveLanguage';
      ctx.reply(t.askLoveLanguage, 
        Markup.keyboard(t.loveLangs.map(l => [l])).oneTime().resize()
      );
      break;

    case 'loveLanguage':
      ctx.session.data.loveLanguage = text;
      ctx.session.step = 'budget';
      ctx.reply(t.askBudget, Markup.removeKeyboard());
      break;

    case 'budget':
      ctx.session.data.budget = text;
      ctx.session.step = 'processing';
      await ctx.reply(t.processing);
      
      try {
        const result = await getGiftRecommendations({ ...ctx.session.data, lang: ctx.session.lang });
        const giftBlocks = result.split(/ПОДАРОК:|СЫЙЛЫҚ:|GIFT:/i).filter(b => b.trim().length > 10);
        
        for (const block of giftBlocks) {
          const lines = block.trim().split('\n');
          const title = lines[0].replace(/^[:\s]*/, '').trim();
          
          let description = '';
          let stats = '';
          let imageQuery = title;

          lines.forEach(line => {
            if (line.match(/ОПИСАНИЕ:|СИПАТТАМАСЫ:|DESCRIPTION:/i)) description = line.replace(/.*?:/i, '').trim();
            if (line.match(/СТАТИСТИКА:|STATISTICS:|СТАТИСТИКАСЫ:/i)) stats = line.replace(/.*?:/i, '').trim();
            if (line.match(/IMAGE_QUERY:/i)) imageQuery = line.replace(/.*?:/i, '').replace(/[\[\]]/g, '').trim();
          });

          const imageUrl = `https://source.unsplash.com/featured/400x300/?${encodeURIComponent(imageQuery)}`;
          
          const encodedTitle = encodeURIComponent(title);
          const links = [
            Markup.button.url(t.buyKaspi, `https://kaspi.kz/shop/search/?text=${encodedTitle}`),
            Markup.button.url(t.buyWB, `https://www.wildberries.kz/catalog/0/search.aspx?search=${encodedTitle}`),
            Markup.button.url(t.buyOzon, `https://www.ozon.kz/search/?text=${encodedTitle}`)
          ];

          const messageText = `🎁 ${title}\n\n📝 ${description}\n\n📊 ${stats}`;
          const keyboard = Markup.inlineKeyboard(links, { columns: 1 });
          
          try {
            await ctx.replyWithPhoto(imageUrl, { 
              caption: messageText,
              ...keyboard
            });
          } catch (e) {
            await ctx.reply(messageText, keyboard);
          }
        }
        await ctx.reply(t.done);
      } catch (error) {
        console.error('Bot processing error:', error);
        ctx.reply(t.error);
      }
      ctx.session = null;
      break;
  }
});

// For Render Web Service, we need to bind to a port
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(port, () => {
  console.log(`Health check server listening on port ${port}`);
});

bot.launch();
console.log('Bot is running on Render...');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

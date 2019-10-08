const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const telegram = new Telegram('919776689:AAGFl5AewtyQ2mZ7Li7bSOEZVt0fVNkoL9k');
const bot = new Telegraf('919776689:AAGFl5AewtyQ2mZ7Li7bSOEZVt0fVNkoL9k');

const welcome = "Видаляю всі повідомлення не пов'язані з музикою\n" +
    "Лишу тільки soundcloud\n" +
    "Інтервал - 1 хвилина";

bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
});

bot.command('help',ctx => ctx.reply(welcome));

const DELETE_AFTER = 60 * 1000;
const MUSIC_PATTERN = /.*http.*(soundcloud|youtube)\.com(\/[\d\w-?=&]+)+/;
bot.on('message', (ctx) => {
    const { message_id, text = '', chat } = ctx.update.message;
    console.log(text, message_id, chat.id);
    if(!text.match(MUSIC_PATTERN))
        setTimeout(() => telegram.deleteMessage(chat.id, message_id), DELETE_AFTER);
});

bot.launch();

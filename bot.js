require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('send me ur geolocation'));

bot.on('message', async (ctx) => {
  console.log(ctx.message);
  if (ctx.message.location) {
    const weatherAPIUrl = `https://openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${process.env.OWEATHER_APIKEY}`;
    const response = await axios.get(weatherAPIUrl);
    ctx.reply(`${response.data.name}: ${response.data.weather[0].main} ${response.data.main.temp} °C`);
  }
});

bot.launch();

const Telegraf = require("telegraf");
const empty = require("lodash").isEmpty;
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

// token
const bot = new Telegraf(process.env.BOT_TOKEN);

// Отправка сообщенія в телеграм
const sendMessage = async (text, keyboard) => {
  try {
    bot.telegram.sendMessage(process.env.ORDER_CHAT_ID, text, keyboard ? Extra.markup(keyboard) : Extra.HTML())
  } catch (error) {
    console.log('error :>> ', error);
  }
}
  

// Главна ф-ція яку ми іспользуємо в контролері (Підключаємо в контролер) 
// Передаємо в функцію статус і обєкт з параметрами
// Приклад: 
// send("PAID", {name: "Снікерс", price: toFloat("19.90")})

const send = async (status, params) => {
  // зчитуємо параметри
  const {
    name,
    price,
    message,
    camp,
    keyboard
  } = params;

  //Оголошуємо зміну "текст"
  let text = "";

  // Робимо конструкцію "світч"
  // Для того, шоб в залежності від статусу, ми відправляли різні типи сообщеній

  switch (status) {
    case "CREATED":
      text += `Новая новая заявка!\n`;
      text += `<b>✅ Статус:</b> Новая \n`;
      text += `<b>Имя: ${name}</b>\n`;
      text += `<b>💰 Cумма:</b> ${price}\n`;
      text += "----------------------------------";
      break;
      case "CREATED_ORDER":
      text += `Новая заявка!\n`;
      text += `<b>✅ Статус:</b> Новий заказ! \n`;
      text += `<b>Имя: ${name}</b>\n`;
      text += `<b>💰 Cумма:</b> ${price}\n`;
      text += "----------------------------------";
      break;
      case "PATCH_ORDER":
      text += `Измена заявки!\n`;
      text += `<b>✅ Статус:</b> Заказ изменен! \n`;
      text += `<b>Имя: ${name}</b>\n`;
      text += `<b>💰 Cумма:</b> ${price}\n`;
      text += "----------------------------------";
      break;
      case "DELETE_ORDER":
      text += `Отмена заявки!\n`;
      text += `<b>✅ Статус:</b> Заказ отменен! \n`;
      text += `<b>Имя: ${name}</b>\n`;
      text += `<b>💰 Cумма:</b> ${price}\n`;
      text += "----------------------------------";
      break;
      case "VEREFICATION_CAMP":
      text += `Новий лагерь!\n`;
      text += `<b>✅ Статус:</b> Новий лагерь!\n`;
      text += `<b> Владелец: ${name}</b>\n`;
      text += `<b>💰 Лагерь:</b> ${camp}\n`;
      text += "----------------------------------";
      break;
      case "PATCH_CAMP":
      text += `Лагерь изменен!\n`;
      text += `<b>✅ Статус:</b> Лагерь изменен! \n`;
      text += `<b> Владелец: ${name}</b>\n`;
      text += `<b>💰 Лагерь:</b> ${camp}\n`;
      text += "----------------------------------";
      break;
    case "NOT_VERIFIED":
      text += `👉 Заявка изменила статус.\n`;
      text += `⚠️ Новый статус: <b>Требует верификации</b>`;
      text += `📬 <b>Полученая сумма</b>: 10.00\n`;
      text += `💰 <b>Ожидаемая сумма</b>: 19.90\n`;
      text += "----------------------------------";
      break;
    case "PAID":
      text += `👉 Заявка изменила статус.\n`;
      text += `💰 Новый статус: <b>Оплачена пользователем</b>\n`;
      text += `<b>Имя: ${name}</b>\n`;
      text += `<b>💰 Cумма:</b> ${price}\n`;
      text += "----------------------------------";
      break;
    case "FAILED":
      text += `👉 Заявка изменила статус.\n`;
      text += `❌ Новый статус: <b>Ошибка</b>\n`;
      text += `<b>Имя: ${name}</b>\n`;
      text += `<b>💰 Cумма:</b> ${price}\n`;
      text += "----------------------------------";
      break;
    case "SYSERROR":
      text += `<b>⚠️Системная ошибка!</b>\n`;
      text += `${message}\n`;
      text += `----------------------------------`;
      break;
    default:
      text += message;
  }
  return sendMessage(text, keyboard);
};

module.exports = { send };
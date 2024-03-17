import * as TelegramBotApi from "node-telegram-bot-api";
import {ru} from "./locales/ru";
import {en} from "./locales/en";
import * as fs from "fs";
import {AppDataSource} from "../config/data-source";
import {User} from "../entity/User";

export class TelegramBot {
    private token: string = `5621982837:AAGjwXOyv6_S26JSGfDP-1OhxatnFmJvK-A`;
    private question: boolean = false;
    private en: boolean = true;
    private bot: TelegramBotApi = new TelegramBotApi(this.token, {polling: true});
    private userRepository = AppDataSource.getRepository(User);

    private buttonArray: {
        start: TelegramBotApi.SendMessageOptions,
        start_en: TelegramBotApi.SendMessageOptions,
        start_ru: TelegramBotApi.SendMessageOptions,
        menu_en: TelegramBotApi.SendMessageOptions,
        menu_ru: TelegramBotApi.SendMessageOptions,
    } = {
        start: {
            reply_markup: {
                inline_keyboard: [
                    [{text: `English`, callback_data: '/start_en'}],
                    [{text: `Русский`, callback_data: '/start_ru'}]
                ]
            }
        },
        start_en: {
            reply_markup: {
                inline_keyboard: [
                    [{text: `Sure!`, callback_data: '/menu_en'}]
                ]
            }
        },
        start_ru: {
            reply_markup: {
                inline_keyboard: [
                    [{text: `Начать`, callback_data: '/menu_ru'}]
                ]
            }
        },
        menu_en: {
            reply_markup: {
                inline_keyboard: [
                    [{text: `About us 📢`, callback_data: '/about_en'}],
                    [{text: `Start bot 🔥`, callback_data: '/join_bot_en'}],
                    [{text: `I have an idea ✋`, callback_data: '/idea_en'}]
                ]
            }
        },
        menu_ru: {
            reply_markup: {
                inline_keyboard: [
                    [{text: `О нас 📢`, callback_data: '/about_ru'}],
                    [{text: `Запустить бота 🔥`, callback_data: '/join_bot_ru'}],
                    [{text: `Есть идея ✋`, callback_data: '/idea_ru'}]
                ]
            }
        }
    };

    constructor() {
        this.startBot().then();
        console.log(__dirname);
        process.env.NTBA_FIX_350 = String(true)
    }

    private startBot = async () => {
        var answerCallbacks = {};
        const bot = this.bot;
        const disableQuestion = () => this.question = false;

        this.bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            var callback = answerCallbacks[msg.chat.id];
            if (callback) {
                delete answerCallbacks[msg.chat.id];
                return callback(msg);
            }

            switch (msg.text) {
                case "/start":
                    this.bot.sendMessage(chatId, "Hi! We present the project \"Leaders of Today\". If you want to know about us, choose the language of communication:", this.buttonArray['start']);
                    break;

                case "/16b0c454b28cf58d3d160fec2836ec14":
                    this.userRepository.find({}).then((res) => {
                        res.forEach(item => {
                            const plainText = `Name: ${item.introduce}\nSupport: ${item.support}\nPhone: ${item.phone}\nEmail: ${item.email}\nOther: ${item.other}`

                            this.bot.sendMessage(chatId, plainText);
                        })
                    })
                    break;

                default:


                    if (this.question && this.en) {
                    } else if (this.question && !this.en) {
                    } else {
                        this.bot.sendMessage(chatId, `Я тебя не понимаю :с`);
                    }

                    break;
            }
        });


        this.bot.on("callback_query", (msg) => {
            const chatId = msg.message.chat.id;
            const video_url = `${__dirname}/../../public/assets/video/about.mp4`;
            const fileOptions = {
                // Explicitly specify the file name.
                filename: 'customfilename',
                // Explicitly specify the MIME type.
                contentType: 'audio/mpeg',
            };

            switch (msg.data) {
                case "/start_en":
                    this.bot.sendMessage(chatId, "Great! Let`s start!", this.buttonArray.start_en);
                    break;

                case "/start_ru":
                    this.bot.sendMessage(chatId, "Отлично, Давай начнем!", this.buttonArray.start_ru);
                    break;

                case "/menu_en":
                    this.bot.sendMessage(chatId, "Great! Let`s start!", this.buttonArray.menu_en);
                    break;


                case "/menu_ru":
                    this.bot.sendMessage(chatId, "Отлично, c чего начнем?", this.buttonArray.menu_ru);
                    break;


                case "/join_bot_en":
                    this.bot.sendMessage(chatId, en.JOIN);

                    break;


                case "/join_bot_ru":
                    this.bot.sendMessage(chatId, ru.JOIN);

                    break;


                case "/idea_en":
                    this.question = true;
                    this.en = true;
                    this.bot.sendMessage(chatId, `Thank you for your responsiveness!\nPlease fill in the information:`);
                    bot.sendMessage(msg.message.chat.id, "Please introduce yourself").then(() => {
                        answerCallbacks[msg.message.chat.id] = function (answer) {
                            var introduce = answer.text;

                            bot.sendMessage(msg.message.chat.id, "What kind of support can you provide:").then(() => {
                                answerCallbacks[msg.message.chat.id] = function (answer) {
                                    var support = answer.text;

                                    bot.sendMessage(msg.message.chat.id, "Specify the phone number for communication:").then(() => {
                                        answerCallbacks[msg.message.chat.id] = function (answer) {
                                            var phone = answer.text;

                                            bot.sendMessage(msg.message.chat.id, "Specify the email address for communication:").then(() => {
                                                answerCallbacks[msg.message.chat.id] = function (answer) {
                                                    var email = answer.text;

                                                    bot.sendMessage(msg.message.chat.id, "Specify an idea for cooperation (or other information)").then(() => {
                                                        answerCallbacks[msg.message.chat.id] = function (answer) {
                                                            var other = answer.text;
                                                            const newUser = Object.assign(new User(), {
                                                                introduce: introduce,
                                                                support: support,
                                                                phone: phone,
                                                                email: email,
                                                                other: other
                                                            });

                                                            AppDataSource.getRepository(User).save(newUser).then(() => {
                                                                bot.sendMessage(msg.message.chat.id, "Отлично, спасибо за обращение!\nМы свяжемся с Вами в ближайшее время!");
                                                                bot.sendMessage(chatId, "Great! Let`s start!", {
                                                                    reply_markup: {
                                                                        inline_keyboard: [
                                                                            [{text: `About us 📢`, callback_data: '/about_en'}],
                                                                            [{text: `Start bot 🔥`, callback_data: '/join_bot_en'}],
                                                                            [{text: `I have an idea ✋`, callback_data: '/idea_en'}]
                                                                        ]
                                                                    }
                                                                });
                                                                disableQuestion();
                                                            })

                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });

                    break;


                case "/idea_ru":
                    this.question = true;
                    this.en = false;
                    this.bot.sendMessage(chatId, `Благодарим за отзывчивость!\nПожалуйста заполните информацию:`);
                    bot.sendMessage(msg.message.chat.id, "Представьтесь пожалуйста").then(() => {
                        answerCallbacks[msg.message.chat.id] = function (answer) {
                            var introduce = answer.text;

                            bot.sendMessage(msg.message.chat.id, "Какой вид поддержки Вы можете оказать:").then(() => {
                                answerCallbacks[msg.message.chat.id] = function (answer) {
                                    var support = answer.text;

                                    bot.sendMessage(msg.message.chat.id, "Укажите номер телефона для связи:").then(() => {
                                        answerCallbacks[msg.message.chat.id] = function (answer) {
                                            var phone = answer.text;

                                            bot.sendMessage(msg.message.chat.id, "Укажите почту для связи:").then(() => {
                                                answerCallbacks[msg.message.chat.id] = function (answer) {
                                                    var email = answer.text;

                                                    bot.sendMessage(msg.message.chat.id, "Укажите идею для сотрудничества (либо иную информацию)").then(() => {
                                                        answerCallbacks[msg.message.chat.id] = function (answer) {
                                                            var other = answer.text;

                                                            const newUser = Object.assign(new User(), {
                                                               introduce: introduce,
                                                               support: support,
                                                               phone: phone,
                                                               email: email,
                                                               other: other
                                                            });

                                                            AppDataSource.getRepository(User).save(newUser).then(() => {
                                                                bot.sendMessage(msg.message.chat.id, "Отлично, спасибо за обращение!\nМы свяжемся с Вами в ближайшее время!");
                                                                bot.sendMessage(chatId, "Отлично, c чего начнем?", {
                                                                    reply_markup: {
                                                                        inline_keyboard: [
                                                                            [{text: `О нас 📢`, callback_data: '/about_ru'}],
                                                                            [{text: `Запустить бота 🔥`, callback_data: '/join_bot_ru'}],
                                                                            [{text: `Есть идея ✋`, callback_data: '/idea_ru'}]
                                                                        ]
                                                                    }
                                                                });
                                                                disableQuestion();
                                                            })

                                                        };
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });

                    break;


                case "/about_en":
                    this.bot.sendMessage(chatId, en.ABOUT);
                    this.bot.sendVideo(chatId, video_url, {
                        has_spoiler: true,
                        caption: `Видео визитка`
                    }, fileOptions);

                    break;


                case "/about_ru":
                    this.bot.sendMessage(chatId, ru.ABOUT);
                    this.bot.sendVideo(chatId, video_url, {
                        has_spoiler: true,
                        caption: `Видео визитка`
                    }, fileOptions);

                    break;

                default:
                    this.bot.sendMessage(chatId, `Я тебя не понимаю :с`);
                    break;
            }
        })
    }

}
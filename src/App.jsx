import React, { useEffect, useState, useRef } from 'react';
import './styles/hub-styles.css';
import './HallOfFame.css';
import HTML2Canvas from 'html2canvas';
import CharacterCreator from './CharacterCreator';
import HallOfFame from './HallOfFame';
const AVATAR = "/QXbbs7jJ_400x400.jpg";
const MB_LOGO = "/stEObS-j_400x400.jpg";
// ===== ASSETS ДЛЯ КОНСТРУКТОРА =====
const ASSETS = {
    backgrounds: [
        { id: 1, src: '/images/backgrounds/1.png' },
        { id: 2, src: '/images/backgrounds/2.png' },
        { id: 3, src: '/images/backgrounds/3.png' },
        { id: 4, src: '/images/backgrounds/4.png' },
    ],
    base: [
        { id: 1, src: '/images/base/1.png' },
        { id: 2, src: '/images/base/2.png' },
        { id: 3, src: '/images/base/3.png' },
        { id: 4, src: '/images/base/4.png' }
    ],
    body: [
        { id: 1, src: '/images/body/1.png' },
        { id: 2, src: '/images/body/2.png' },
        { id: 3, src: '/images/body/3.png' },
        { id: 4, src: '/images/body/4.png' }
    ],
    clothes: [
        { id: 1, src: '/images/clothes/1.png' },
        { id: 2, src: '/images/clothes/2.png' },
        { id: 3, src: '/images/clothes/3.png' },
        { id: 4, src: '/images/clothes/4.png' },
        { id: 5, src: '/images/clothes/5.png' },
        { id: 6, src: '/images/clothes/6.png' },
        { id: 7, src: '/images/clothes/7.png' },
        { id: 8, src: '/images/clothes/8.png' }
    ],
    face: [
        { id: 1, src: '/images/face/1.png' },
        { id: 2, src: '/images/face/2.png' },
        { id: 3, src: '/images/face/3.png' },
        { id: 4, src: '/images/face/4.png' }
    ],
    hair: [
        { id: 1, src: '/images/hair/1.png' },
        { id: 2, src: '/images/hair/2.png' },
        { id: 3, src: '/images/hair/3.png' },
        { id: 4, src: '/images/hair/4.png' },
        { id: 5, src: '/images/hair/5.png' },
        { id: 6, src: '/images/hair/6.png' },
        { id: 7, src: '/images/hair/7.png' },
        { id: 8, src: '/images/hair/8.png' },
        { id: 9, src: '/images/hair/9.png' }
    ],
    hat: [
        { id: 1, src: '/images/hat/1.png' },
        { id: 2, src: '/images/hat/2.png' },
        { id: 3, src: '/images/hat/3.png' }
    ],
    hearts: [
        { id: 1, src: '/images/hearts/1.png' },
        { id: 2, src: '/images/hearts/2.png' },
        { id: 3, src: '/images/hearts/3.png' },
        { id: 4, src: '/images/hearts/4.png' }
    ]
};
const translations = {
    ru: {
        mainTitle: "MAGIC BLOCK",
        mainSubtitle: "Главное меню моей игры и фан хаба MagicBlock.",
        gameButton: "ИГРА",
        hubButton: "ХАБ",
        solanaText: "Solana",

        language: "Язык",
        russian: "Русский",
        english: "English",

        gameInDevelopment: "Игра в разработке",
        gameComingSoon: "Игра Magic Block находится в активной разработке. Ожидайте скорого релиза!",
        gotIt: "Понятно",

        backButton: "← Назад",
        hubTitle: "MagicBlock Hub",
        home: "ГЛАВНАЯ",
        project: "ПРОЕКТ",
        community: "СООБЩЕСТВО",
        news: "НОВОСТИ",
        quizTab: "🧪 КВИЗ",
        about: "ОБО МНЕ",
        media: "МЕДИА",
        torName: "Tor00_1",
        suggestions: "Предложения и идеи в дс: @tor00_1",

        magicBlockCard: "MagicBlock",
        magicBlockDesc: "Кратко о проекте",
        newsCard: "Новости",
        newsDesc: "Новости MagicBlock",
        communityCard: "Комьюнити",
        communityDesc: "Челленджи, ивенты и инфа",

        footerText: "Независимый фан-хаб • 2026 • Tor00_1",
        twitterLink: "@cryptoo_tor",

        magicBlockPage: {
            title: "MagicBlock",
            subtitle: "Расширение сети Solana для нового поколения consumer-приложений",
            section1: {
                title: "Что такое MagicBlock",
                content1: "<strong>MagicBlock</strong> — это расширение сети Solana, созданное для разработки нового поколения consumer-приложений. Открытых, децентрализованных и по-настоящему неостанавливаемых.",
                content2: "MagicBlock ускоряет и расширяет возможности Solana, при этом полностью сохраняя ее ключевое преимущество — композируемость.",
                content3: "Платформа позволяет разработчикам создавать приложения, которые работают быстрее, масштабируются эффективнее и остаются совместимыми с экосистемой Solana."
            },
            section2: {
                title: "Что такое Ephemeral Rollups",
                content1: "<strong>Ephemeral Rollups</strong> — это новый примитив, представленный MagicBlock, который позволяет масштабировать Solana без фрагментации состояния.",
                content2: "По сути, это Just-In-Time рантаймы на базе SVM, которые ускоряют изменения состояния для выбранных аккаунтов Solana. Разработчики могут делегировать любые аккаунты из существующих смарт-контрактов Solana в MagicBlock Engine и получать:",
                feature1: "Более высокая производительность",
                feature2: "Настраиваемые среды выполнения",
                feature3: "Выделенный блокспейс под конкретные задачи",
                highlight: "Все это без потери совместимости с основной сетью."
            },
            section3: {
                title: "Что можно создавать с помощью MagicBlock",
                useCase1: {
                    title: "Неостанавливаемые игры и приложения",
                    content: "Приложения, которые не зависят от серверов или централизованной инфраструктуры. Они работают полностью на блокчейне, а значит не могут быть отключены, заблокированы или изменены в одностороннем порядке."
                },
                useCase2: {
                    title: "Permissionless composable приложения",
                    content: "Вся логика и данные открыты. Любой разработчик может расширять ваш продукт, добавлять новый контент, механику или интегрироваться с другими играми и приложениями без ограничений."
                },
                useCase3: {
                    title: "Финансовые приложения с низкой задержкой",
                    content: "MagicBlock подходит для высоконагруженных финансовых решений, таких как:",
                    apps: ["Децентрализованные биржи", "Prediction markets", "Маркетплейсы", "Другие high-load решения"],
                    additional: "...и другие приложения, где критичны высокая пропускная способность и минимальная задержка."
                }
            }
        },

        communityPage: {
            title: "Сообщество",
            subtitle: "Творческие вызовы и онлайн-ивенты сообщества MagicBlock",
            challenges: "Челленджи",
            events: "Ивенты",
            activeChallenges: "активных",
            activeEvents: "активный",
            challengesTitle: "Челленджи сообщества",
            challengesDescription: "Присоединяйся к творческим вызовам от участников MagicBlock и покажи свой талант!",
            eventsTitle: "Ивенты сообщества",
            noEventsNotice: "Новых ивентов пока нет. Вот последний ивент:",
            authorLabel: "Авторы:",
            participate: "Участвовать в Twitter",
            joinDiscord: "Присоединиться в Discord",
            setReminder: "Установить напоминание",
            motivation: "May the fastest and sharpest win!",
            statusUpcoming: "Скоро",
            statusLive: "Прямо сейчас",
            statusPast: "Завершен",
            dateLabel: "Дата и время",
            forWhom: "Для кого",
            participants: "участников",
            organizer: "Организатор ивента"
        },

        newsPage: {
            title: "Новости & Анонсы",
            subtitle: "Самые свежие обновления, партнерства и события в экосистеме MagicBlock",
            allNews: "Все новости",
            token: "🚀 Токен",
            event: "🎯 События",
            tech: "⚙️ Технологии",
            sponsor: "🤝 Спонсорство",
            statusUpcoming: "Скоро",
            statusActive: "Активно",
            statusLive: "Запущено",
            readMore: "Читать полностью",
            collapse: "Свернуть",
            usefulLinks: "🔗 Полезные ссылки:",
            followNews: "Следите за новостями",
            followDescription: "Подпишитесь на наш Twitter, чтобы быть в курсе всех обновлений MagicBlock",
            subscribeTwitter: "Подписаться в Twitter"
        },

        aboutPage: {
            title: "Tor00_1 (@cryptoo_tor)",
            subtitle: "Независимый контрибьютор MagicBlock",
            aboutMe: {
                title: "Обо мне",
                content1: "Активный участник экосистемы Solana и энтузиаст децентрализованных технологий.",
                content2: "Создатель этого фан-хаба для информирования русскоязычного комьюнити о проекте MagicBlock."
            },
            mission: {
                title: "Миссия",
                content1: "Распространение информации о передовых технологиях в блокчейн-пространстве.",
                content2: "Помощь разработчикам и энтузиастам в понимании возможностей MagicBlock и Ephemeral Rollups."
            },
            collaboration: {
                title: "Предложения и сотрудничество",
                content1: "Всегда открыт для обсуждения идей по улучшению экосистемы MagicBlock.",
                content2: "Готов помочь с интеграцией технологий и распространением информации."
            },
            twitter: "Twitter",
            discord: "Discord",
            goToTwitter: "Перейти в Twitter",
            addDiscord: "Добавить в Discord",
            contactInfo: "Открыт для предложений и идеи в Discord:",
            disclaimer: "Это независимый фан-сайт, не аффилированный с официальной командой MagicBlock"
        },

        mediaPage: {
            title: "Медиа и ресурсы",
            subtitle: "Официальная документация, инструменты для разработки и ссылки на сообщество MagicBlock. Всё для создания приложений реального времени на Solana.",
            allMaterials: "Все материалы",
            docsTitle: "📚 Продукты и Документация",
            toolsTitle: "🛠️ Инструменты и SDK",
            videosTitle: "🎥 Видео и Демонстрации",
            communityTitle: "🌐 Сообщество и Блог",
            soon: "Скоро",
            open: "Открыть",
            quickAccess: "🚀 Быстрый доступ к основному",
            startDev: "Начать разработку",
            startDevDesc: "Полная документация по продуктам",
            sourceCode: "Исходный код",
            sourceCodeDesc: "Все репозитории на GitHub",
            officialSite: "Официальный сайт",
            officialSiteDesc: "Узнать о возможностях",
            joinCommunity: "Присоединиться",
            joinCommunityDesc: "Сообщество в Discord"
        },

        quizPage: {
            title: "Квиз MagicBlock",
            subtitle: "Проверь свои знания о MagicBlock и получи сертификат!",
            startButton: "Начать квиз",
            rules: "Правила",
            rulesContent: "Ответь на 10 вопросов о MagicBlock. Чтобы получить сертификат, нужно правильно ответить минимум на 8 вопросов. Можно ввести свой ник и загрузить аватар для персонализации.",
            question: "Вопрос {current}/{total}",
            nextButton: "Следующий вопрос",
            prevButton: "Назад",
            submitButton: "Завершить квиз",
            resultTitle: "Результаты квиза",
            score: "Твой результат: {score}/10",
            certificateTitle: "Поздравляем! 🎉",
            certificateSubtitle: "Ты успешно прошел квиз и заработал сертификат MagicBlock",
            noCertificateTitle: "Почти получилось!",
            noCertificateSubtitle: "Нужно правильно ответить минимум на 8 вопросов. Попробуй еще раз!",
            retryButton: "Пройти заново",
            downloadButton: "Скачать сертификат",
            shareButton: "Поделиться",
            enterUsername: "Введи свой ник:",
            uploadAvatar: "Загрузи аватар (опционально):",
            uploadButton: "Выбрать файл",
            generating: "Генерация сертификата...",
            usernameRequired: "Пожалуйста, введи ник",
            certificateText: "{username} успешно прошел тестирование по MagicBlock, продемонстрировав знания о Ephemeral Rollups и экосистеме Solana.",
            date: "Дата:",
            signature: "Подпись:",
            torSignature: "Tor00_1 (@cryptoo_tor)",
            magicBlockSeal: "MagicBlock Fan Hub"
        },

        hallOfFameTab: "🏆 ЗАЛ СЛАВЫ",
        hallOfFamePage: {
            twitterImportant: "ВАЖНО:",
            twitterInstruction: "Сделайте quote retweet (цитатный ретвит) этого поста с вашим сертификатом и отметьте меня @cryptoo_tor",
            twitterQuoteLink: "Ссылка на пост для quote retweet",
            title: "Зал Славы MagicBlock Quiz",
            subtitle: "Лучшие из лучших! Участники, показавшие выдающиеся результаты в квизе",
            scoreFilters: "Фильтры по очкам",
            allScores: "Все результаты",
            score10: "🏆 10/10 Совершенно",
            score9: "🥈 9/10 Отлично",
            score8: "🥉 8/10 Отлично",
            pioneers: "🚀 Первопроходцы",
            firstCompleters: "Первые 3 завершивших",
            leaderboard: "🏆 Таблица лидеров",
            rank: "Место",
            player: "Участник",
            score: "Очки",
            date: "Дата прохождения",
            time: "Время",
            twitterPost: "Пост в Twitter",
            certificate: "Сертификат",
            noData: "Данные будут добавлены после начала челленджа",
            totalPlayers: "Всего участников",
            averageScore: "Средний балл",
            topPlayers: "Топ игроков",
            filterByScore: "Фильтровать по очкам",
            viewCertificate: "Посмотреть сертификат",
            viewTwitter: "Посмотреть пост"
        },

        valentineTab: "🎨 КОНСТРУКТОР",
        valentinePage: {
            title: "Конструктор персонажей Magic Block",
            subtitle: "Создай уникального персонажа с магическим дизайном",
            randomButton: "🎲 Рандом",
            saveButton: "💾 Сохранить",
            background: "Background",
            base: "Base",
            body: "Body",
            face: "Face",
            clothes: "Clothes",
            hair: "Hair",
            hat: "Hat",
            hearts: "Hearts",
            fromPlaceholder: " From:",
            toPlaceholder: "To:",
            elements: "элементов",
            selected: "Выбрано",
            placeholderTo: "Введите имя...",
            placeholderFrom: "Ваше имя...",
            generateSuccess: "Валентинка создана!",
            generating: "Генерация изображения...",
            downloadSuccess: "Изображение скачано!",
            shareSuccess: "Ссылка скопирована в буфер обмена!",
            loading: "Загрузка изображений...",
            valentineCreator: "ВАЛЕНТИНКА"
        }
    },
    en: {
        mainTitle: "MAGIC BLOCK",
        mainSubtitle: "Main menu of my game and MagicBlock fan hub.",
        gameButton: "GAME",
        hubButton: "HUB",
        solanaText: "Solana",

        language: "Language",
        russian: "Русский",
        english: "English",

        gameInDevelopment: "Game in Development",
        gameComingSoon: "Magic Block game is currently in active development. Stay tuned for release!",
        gotIt: "Got it",

        backButton: "← Back",
        hubTitle: "MagicBlock Hub",
        home: "HOME",
        project: "PROJECT",
        community: "COMMUNITY",
        news: "NEWS",
        quizTab: "🧪 QUIZ",
        about: "ABOUT",
        media: "MEDIA",
        torName: "Tor00_1",
        suggestions: "Suggestions and ideas in ds: @tor00_1",

        magicBlockCard: "MagicBlock",
        magicBlockDesc: "About the project",
        newsCard: "News",
        newsDesc: "MagicBlock news",
        communityCard: "Community",
        communityDesc: "Challenges, events and info",
        certificateText: "{username} успешно прошел тестирование по MagicBlock, продемонстрировав знания о Ephemeral Rollups и экосистеме Solana.",

        footerText: "Independent fan hub • 2026 • Tor00_1",
        twitterLink: "@cryptoo_tor",

        magicBlockPage: {
            title: "MagicBlock",
            subtitle: "Solana network extension for the new generation of consumer applications",
            section1: {
                title: "What is MagicBlock",
                content1: "<strong>MagicBlock</strong> is a Solana network extension designed for developing the next generation of consumer applications. Open, decentralized, and truly unstoppable.",
                content2: "MagicBlock accelerates and expands Solana's capabilities while fully preserving its key advantage - composability.",
                content3: "The platform allows developers to create applications that work faster, scale more efficiently, and remain compatible with the Solana ecosystem."
            },
            section2: {
                title: "What are Ephemeral Rollups",
                content1: "<strong>Ephemeral Rollups</strong> is a new primitive introduced by MagicBlock that allows scaling Solana without state fragmentation.",
                content2: "Essentially, these are Just-In-Time runtimes based on SVM that accelerate state changes for selected Solana accounts. Developers can delegate any accounts from existing Solana smart contracts to the MagicBlock Engine and get:",
                feature1: "Higher performance",
                feature2: "Customizable runtime environments",
                feature3: "Dedicated blockspace for specific tasks",
                highlight: "All this without losing compatibility with the main network."
            },
            section3: {
                title: "What can be built with MagicBlock",
                useCase1: {
                    title: "Unstoppable games and applications",
                    content: "Applications that don't depend on servers or centralized infrastructure. They work entirely on the blockchain, meaning they cannot be turned off, blocked, or unilaterally changed."
                },
                useCase2: {
                    title: "Permissionless composable applications",
                    content: "All logic and data are open. Any developer can extend your product, add new content, mechanics, or integrate with other games and applications without restrictions."
                },
                useCase3: {
                    title: "Low-latency financial applications",
                    content: "MagicBlock is suitable for high-load financial solutions such as:",
                    apps: ["Decentralized exchanges", "Prediction markets", "Marketplaces", "Other high-load solutions"],
                    additional: "...and other applications where high throughput and minimal latency are critical."
                }
            }
        },

        communityPage: {
            title: "Community",
            subtitle: "Creative challenges and online events of the MagicBlock community",
            challenges: "Challenges",
            events: "Events",
            activeChallenges: "active",
            activeEvents: "active",
            challengesTitle: "Community Challenges",
            challengesDescription: "Join creative challenges from MagicBlock participants and show your talent!",
            eventsTitle: "Community Events",
            noEventsNotice: "No new events yet. Here's the last event:",
            authorLabel: "Authors:",
            participate: "Participate on Twitter",
            joinDiscord: "Join on Discord",
            setReminder: "Set reminder",
            motivation: "May the fastest and sharpest win!",
            statusUpcoming: "Upcoming",
            statusLive: "Live now",
            statusPast: "Completed",
            dateLabel: "Date and time",
            forWhom: "For whom",
            participants: "participants",
            organizer: "Event organizer"
        },

        newsPage: {
            title: "News & Announcements",
            subtitle: "Latest updates, partnerships, and events in the MagicBlock ecosystem",
            allNews: "All news",
            token: "🚀 Token",
            event: "🎯 Events",
            tech: "⚙️ Technology",
            sponsor: "🤝 Sponsorship",
            statusUpcoming: "Coming soon",
            statusActive: "Active",
            statusLive: "Launched",
            readMore: "Read more",
            collapse: "Collapse",
            usefulLinks: "🔗 Useful links:",
            followNews: "Follow the news",
            followDescription: "Subscribe to our Twitter to stay updated on all MagicBlock news",
            subscribeTwitter: "Subscribe on Twitter"
        },

        aboutPage: {
            title: "Tor00_1 (@cryptoo_tor)",
            subtitle: "Independent MagicBlock contributor",
            aboutMe: {
                title: "About me",
                content1: "Active participant in the Solana ecosystem and enthusiast of decentralized technologies.",
                content2: "Creator of this fan hub to inform the Russian-speaking community about the MagicBlock project."
            },
            mission: {
                title: "Mission",
                content1: "Disseminating information about advanced technologies in the blockchain space.",
                content2: "Helping developers and enthusiasts understand the capabilities of MagicBlock and Ephemeral Rollups."
            },
            collaboration: {
                title: "Suggestions and collaboration",
                content1: "Always open to discussing ideas for improving the MagicBlock ecosystem.",
                content2: "Ready to help with technology integration and information dissemination."
            },
            twitter: "Twitter",
            discord: "Discord",
            goToTwitter: "Go to Twitter",
            addDiscord: "Add on Discord",
            contactInfo: "Open for suggestions and ideas on Discord:",
            disclaimer: "This is an independent fan site, not affiliated with the official MagicBlock team"
        },

        mediaPage: {
            title: "Media & Resources",
            subtitle: "Official documentation, development tools, and community links for MagicBlock. Everything for building real-time applications on Solana.",
            allMaterials: "All materials",
            docsTitle: "📚 Products & Documentation",
            toolsTitle: "🛠️ Tools & SDK",
            videosTitle: "🎥 Videos & Demos",
            communityTitle: "🌐 Community & Blog",
            soon: "Soon",
            open: "Open",
            quickAccess: "🚀 Quick access to essentials",
            startDev: "Start developing",
            startDevDesc: "Complete product documentation",
            sourceCode: "Source code",
            sourceCodeDesc: "All repositories on GitHub",
            officialSite: "Official website",
            officialSiteDesc: "Learn about capabilities",
            joinCommunity: "Join",
            joinCommunityDesc: "Community on Discord"
        },

        quizPage: {
            title: "MagicBlock Quiz",
            subtitle: "Test your knowledge about MagicBlock and earn a certificate!",
            startButton: "Start Quiz",
            rules: "Rules",
            rulesContent: "Answer 10 questions about MagicBlock. To get a certificate, you need to correctly answer at least 8 questions. You can enter your username and upload an avatar for personalization.",
            question: "Question {current}/{total}",
            nextButton: "Next Question",
            prevButton: "Back",
            submitButton: "Finish Quiz",
            resultTitle: "Quiz Results",
            score: "Your score: {score}/10",
            certificateTitle: "Congratulations! 🎉",
            certificateSubtitle: "You've successfully passed the quiz and earned a MagicBlock certificate",
            noCertificateTitle: "Almost there!",
            noCertificateSubtitle: "You need at least 8 correct answers. Try again!",
            retryButton: "Try Again",
            downloadButton: "Download Certificate",
            shareButton: "Share",
            enterUsername: "Enter your username:",
            uploadAvatar: "Upload avatar (optional):",
            uploadButton: "Choose File",
            generating: "Generating certificate...",
            usernameRequired: "Please enter username",
            certificateText: "This certifies that {username} has successfully completed the MagicBlock technology assessment and demonstrates deep understanding of Ephemeral Rollups and Solana ecosystem capabilities.",
            date: "Date:",
            signature: "Signature:",
            torSignature: "Tor00_1 (@cryptoo_tor)",
            magicBlockSeal: "MagicBlock Fan Hub"
        },

        hallOfFameTab: "🏆 HALL OF FAME",
        hallOfFamePage: {
            twitterImportant: "IMPORTANT:",
            twitterInstruction: "Make a quote retweet of this post with your certificate and mention me @cryptoo_tor",
            twitterQuoteLink: "Link for quote retweet",
            title: "MagicBlock Quiz Hall of Fame",
            subtitle: "The best of the best! Participants who showed outstanding results in the quiz",
            scoreFilters: "Score Filters",
            allScores: "All Scores",
            score10: "🏆 10/10 Perfect",
            score9: "🥈 9/10 Excellent",
            score8: "🥉 8/10 Great",
            pioneers: "🚀 Pioneers",
            firstCompleters: "First 3 Completers",
            leaderboard: "🏆 Leaderboard",
            rank: "Rank",
            player: "Player",
            score: "Score",
            date: "Completion Date",
            time: "Time",
            twitterPost: "Twitter Post",
            certificate: "Certificate",
            noData: "Data will be added after challenge starts",
            totalPlayers: "Total Players",
            averageScore: "Average Score",
            topPlayers: "Top Players",
            filterByScore: "Filter by Score",
            viewCertificate: "View Certificate",
            viewTwitter: "View Post"
        },

        valentineTab: "🎨 CREATOR",
        valentinePage: {
            title: "Magic Block Character Creator",
            subtitle: "Create a unique character with magical design",
            randomButton: "🎲 Random",
            saveButton: "💾 Save",
            background: "Background",
            base: "Base",
            body: "Body",
            face: "Face",
            clothes: "Clothes",
            hair: "Hair",
            hat: "Hat",
            hearts: "Hearts",
            fromPlaceholder: " From:",
            toPlaceholder: "To:",
            elements: "elements",
            selected: "Selected",
            placeholderTo: "Enter name...",
            placeholderFrom: "Your name...",
            generateSuccess: "Valentine created!",
            generating: "Generating image...",
            downloadSuccess: "Image downloaded!",
            shareSuccess: "Link copied to clipboard!",
            loading: "Loading images..."
        }
    }
};


function LanguageSelector({ onLanguageSelect }) {
    const [selectedLang, setSelectedLang] = useState(null);

    useEffect(() => {
        const savedLang = localStorage.getItem('magicblock_lang');
        if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
            onLanguageSelect(savedLang);
        }
    }, [onLanguageSelect]);

    const handleLanguageSelect = (lang) => {
        localStorage.setItem('magicblock_lang', lang);
        onLanguageSelect(lang);
    };

    return (
        <div className="lang-selector-overlay">
            <div className="lang-selector">
                <h2>Magic Block</h2>
                <p>Выберите язык / Select Language</p>

                <div className="lang-buttons">
                    <button
                        className={`lang-button ${selectedLang === 'ru' ? 'active' : ''}`}
                        onClick={() => setSelectedLang('ru')}
                    >
                        <span className="flag">🇷🇺</span>
                        <span>Русский</span>
                    </button>

                    <button
                        className={`lang-button ${selectedLang === 'en' ? 'active' : ''}`}
                        onClick={() => setSelectedLang('en')}
                    >
                        <span className="flag">🇺🇸</span>
                        <span>English</span>
                    </button>
                </div>

                <button
                    className="lang-continue-btn"
                    onClick={() => selectedLang && handleLanguageSelect(selectedLang)}
                    style={{ marginTop: '40px', padding: '15px 40px' }}
                    disabled={!selectedLang}
                >
                    Продолжить / Continue
                </button>
            </div>
        </div>
    );
}

function HubBackground() {
    return (
        <>
            <div className="hub-background-wrapper hub-anim-fade-in">
                <img
                    src="/bg.jpg"
                    className="hub-bg-image"
                    alt="background"
                    loading="lazy"
                />
                <div className="hub-vignette"></div>
            </div>
        </>
    );
}
// ===== КОМПОНЕНТ КОНСТРУКТОРА ПЕРСОНАЖЕЙ =====


function HubApp({ t, currentLang, setCurrentLang }) {
    const [page, setPage] = useState('home');
    const [showQuizBadge, setShowQuizBadge] = useState(true);

    const showStandardLayout = page !== 'valentine' && page !== 'halloffame';

    const renderContent = () => {
        switch (page) {
            case 'home': return <HomePage setPage={setPage} t={t} showQuizBadge={showQuizBadge} setShowQuizBadge={setShowQuizBadge} />;
            case 'magicblock': return <MagicBlockPage t={t} setPage={setPage} />;
            case 'community': return <CommunityPage t={t} />;
            case 'news': return <NewsPage t={t} />;
            case 'about': return <AboutPage t={t} />;
            case 'media': return <MediaPage t={t} />;
            case 'quiz': return <QuizPage t={t} />;
            case 'halloffame': return <HallOfFamePage t={t} />;
            case 'valentine': return <CharacterCreator />;
            default: return <HomePage setPage={setPage} t={t} showQuizBadge={showQuizBadge} setShowQuizBadge={setShowQuizBadge} />;
        }
    };

    const handleLanguageChange = (lang) => {
        setCurrentLang(lang);
        localStorage.setItem('magicblock_lang', lang);
    };

    return (
        <div className="hub-shell">
            <HubBackground />

            <div className="lang-switcher">
                <button
                    className={`lang-btn ${currentLang === 'ru' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('ru')}
                >
                    🇷🇺 RU
                </button>
                <button
                    className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('en')}
                >
                    🇺🇸 EN
                </button>
            </div>

            <nav className="navbar">
                <div className="nav-brand" onClick={() => setPage('home')}>
                    <img src={MB_LOGO} alt="MB" />
                    <span>{t.hubTitle}</span>
                </div>

                <div className="nav-links">
                    <button onClick={() => setPage('home')} className={page === 'home' ? 'active' : ''}>
                        {t.home}
                    </button>

                    <button onClick={() => setPage('valentine')} className={page === 'valentine' ? 'active' : ''}>
                        🎨 {t.valentineTab || "Valentine Maker"}
                    </button>

                    <button onClick={() => setPage('magicblock')} className={page === 'magicblock' ? 'active' : ''}>
                        {t.project}
                    </button>
                    <button onClick={() => setPage('community')} className={page === 'community' ? 'active' : ''}>
                        {t.community}
                    </button>
                    <button onClick={() => setPage('news')} className={page === 'news' ? 'active' : ''}>
                        {t.news}
                    </button>
                    <button onClick={() => setPage('media')} className={page === 'media' ? 'active' : ''}>
                        {t.media}
                    </button>
                    <button onClick={() => setPage('quiz')} className={page === 'quiz' ? 'active' : ''}>
                        {t.quizTab} {showQuizBadge && <span className="quiz-badge">🔥</span>}
                    </button>
                    <button onClick={() => setPage('halloffame')} className={page === 'halloffame' ? 'active' : ''}>
                        🏆 {t.hallOfFameTab || "HALL OF FAME"}
                    </button>
                </div>

                <div className="nav-profile" onClick={() => setPage('about')}>
                    <span>{t.torName}</span>
                    <img src={AVATAR} alt="Tor" />
                </div>
            </nav>

            {showStandardLayout ? (
                <main className="main-content">
                    {renderContent()}
                </main>
            ) : page === 'valentine' ? (
                // Для валентинки - свой layout без ограничений
                <div className="valentine-main-container">
                        <CharacterCreator />
                </div>
            ) : page === 'halloffame' ? (
                // Для Hall of Fame - на весь экран
                <HallOfFame />
            ) : null}

            {page !== 'halloffame' && (
                <footer className="footer">
                    <div className="footer-content">
                        <p>{t.footerText}</p>
                        <a
                            href="https://x.com/cryptoo_tor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="twitter-link"
                            title={t.twitterLink}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                            <span>{t.twitterLink}</span>
                        </a>
                    </div>
                </footer>
            )}
        </div>
    );
}

const HomePage = ({ setPage, t, showQuizBadge, setShowQuizBadge }) => {
    console.log('showQuizBadge:', showQuizBadge); // Для отладки

    return (
        <div className="page hub-anim-fade-in">
            <div className="intro-grid">
                <div className="intro-card hub-anim-reveal" style={{ animationDelay: '0.1s' }}>
                    <div className="avatar-container">
                        <h3>{t.torName}</h3>
                        <img src={AVATAR} alt="Tor" className="avatar" />
                    </div>
                    <p className="compact-text">{t.suggestions}</p>
                </div>

                <div className="video-card">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        width="100%"
                        height="100%"
                        style={{
                            objectFit: 'cover',
                            borderRadius: '12px',
                            pointerEvents: 'none'
                        }}
                        preload="auto"
                        src="https://i.imgur.com/ES1SUZK.mp4"
                    />
                </div>
            </div>

            {/* Quiz Challenge Banner */}
            {showQuizBadge !== false && (
                <div className="quiz-challenge-banner hub-anim-reveal-up" style={{ animationDelay: '0.2s' }}>
                    <div className="quiz-banner-content">
                        <div className="quiz-banner-icon">🔥</div>
                        <div className="quiz-banner-text">
                            <h3>{t.quizPage.title === "Квиз MagicBlock" ? "Сейчас идет челлендж с квизом!" : "Quiz Challenge is Live Now!"}</h3>
                            <p>{t.quizPage.title === "Квиз MagicBlock"
                                ? "Пройди квиз и попади в Зал Славы MagicBlock! Первые участники получат особое признание."
                                : "Take the quiz and get into MagicBlock Hall of Fame! First participants get special recognition."}</p>
                        </div>
                        <button
                            className="quiz-banner-button"
                            onClick={() => {
                                console.log('Navigating to quiz page');
                                setPage('quiz');
                                if (setShowQuizBadge) {
                                    setShowQuizBadge(false);
                                }
                            }}
                        >
                            🚀 {t.quizPage.title === "Квиз MagicBlock" ? "Пройти квиз сейчас!" : "Take the quiz now!"}
                        </button>
                        <button
                            className="quiz-banner-close"
                            onClick={() => setShowQuizBadge && setShowQuizBadge(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <div className="cards-grid">
                <div className="card hub-anim-reveal-up" style={{ animationDelay: '0.3s' }} onClick={() => setPage('magicblock')}>
                    <span className="icon">🧩</span>
                    <h3>{t.magicBlockCard}</h3>
                    <p>{t.magicBlockDesc}</p>
                </div>
                <div className="card hub-anim-reveal-up" style={{ animationDelay: '0.4s' }} onClick={() => setPage('news')}>
                    <span className="icon">📰</span>
                    <h3>{t.newsCard}</h3>
                    <p>{t.newsDesc}</p>
                </div>
                <div className="card hub-anim-reveal-up" style={{ animationDelay: '0.5s' }} onClick={() => setPage('community')}>
                    <span className="icon">👥</span>
                    <h3>{t.communityCard}</h3>
                    <p>{t.communityDesc}</p>
                </div>
            </div>
        </div>
    );
};

const MagicBlockPage = ({ t, setPage }) => {
    const magicBlock = t.magicBlockPage;

    return (
        <div className="page hub-anim-fade-in">
            <div className="project-header">
                <h1>{magicBlock.title}</h1>
                <p className="project-subtitle">{magicBlock.subtitle}</p>
            </div>

            <div className="project-sections">
                <div className="project-section hub-anim-reveal-up" style={{ animationDelay: '0.1s' }}>
                    <div className="section-icon">🚀</div>
                    <div className="section-content">
                        <h2>{magicBlock.section1.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: magicBlock.section1.content1 }} />
                        <p>{magicBlock.section1.content2}</p>
                        <p>{magicBlock.section1.content3}</p>
                    </div>
                </div>

                <div className="project-section hub-anim-reveal-up" style={{ animationDelay: '0.2s' }}>
                    <div className="section-icon">⚡</div>
                    <div className="section-content">
                        <h2>{magicBlock.section2.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: magicBlock.section2.content1 }} />
                        <p>{magicBlock.section2.content2}</p>

                        <div className="features-list">
                            <div className="feature-item">
                                <span className="feature-bullet">•</span>
                                <span className="feature-text">{magicBlock.section2.feature1}</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-bullet">•</span>
                                <span className="feature-text">{magicBlock.section2.feature2}</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-bullet">•</span>
                                <span className="feature-text">{magicBlock.section2.feature3}</span>
                            </div>
                        </div>

                        <p className="highlight-text">
                            {magicBlock.section2.highlight}
                        </p>
                    </div>
                </div>

                <div className="project-section hub-anim-reveal-up" style={{ animationDelay: '0.3s' }}>
                    <div className="section-icon">🎯</div>
                    <div className="section-content">
                        <h2>{magicBlock.section3.title}</h2>

                        <div className="use-cases-grid">
                            <div className="use-case">
                                <h3>🎮 {magicBlock.section3.useCase1.title}</h3>
                                <p>{magicBlock.section3.useCase1.content}</p>
                            </div>

                            <div className="use-case">
                                <h3>🧩 {magicBlock.section3.useCase2.title}</h3>
                                <p>{magicBlock.section3.useCase2.content}</p>
                            </div>

                            <div className="use-case">
                                <h3>💎 {magicBlock.section3.useCase3.title}</h3>
                                <p>{magicBlock.section3.useCase3.content}</p>
                                <div className="finance-apps">
                                    {magicBlock.section3.useCase3.apps.map((app, index) => (
                                        <span key={index} className="app-tag">{app}</span>
                                    ))}
                                </div>
                                <p>
                                    {magicBlock.section3.useCase3.additional}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="quiz-cta-section hub-anim-reveal-up" style={{ animationDelay: '0.4s' }}>
                <div className="quiz-cta-card">
                    <div className="quiz-cta-icon">🧪</div>
                    <div className="quiz-cta-content">
                        <h3>
                            {t.quizPage.title === "Квиз MagicBlock"
                                ? "Проверь свои знания о MagicBlock!"
                                : "Test your knowledge about MagicBlock!"}
                        </h3>
                        <p>
                            {t.quizPage.title === "Квиз MagicBlock"
                                ? "Пройди квиз и получи сертификат, подтверждающий твои знания о технологии Ephemeral Rollups!"
                                : "Take the quiz and earn a certificate confirming your knowledge of Ephemeral Rollups technology!"}
                        </p>
                        <ul className="quiz-benefits">
                            <li>✅ {t.quizPage.title === "Квиз MagicBlock" ? "10 вопросов о MagicBlock" : "10 questions about MagicBlock"}</li>
                            <li>✅ {t.quizPage.title === "Квиз MagicBlock" ? "Персонализированный сертификат" : "Personalized certificate"}</li>
                            <li>✅ {t.quizPage.title === "Квиз MagicBlock" ? "Поделись результатом" : "Share your results"}</li>
                        </ul>
                    </div>
                    <button
                        className="quiz-cta-button"
                        onClick={() => setPage('quiz')}
                    >
                        {t.quizPage.title === "Квиз MagicBlock"
                            ? "Пройти квиз →"
                            : "Take Quiz →"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const CommunityPage = ({ t }) => {
    const community = t.communityPage;
    const [activeSection, setActiveSection] = useState('challenges');

    const formatEventDate = (dateObj) => {
        const isRussian = t.communityPage.title === "Сообщество";

        if (dateObj instanceof Date) {
            const day = dateObj.getDate();
            const month = isRussian ?
                ['янв.', 'февр.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'][dateObj.getMonth()] :
                ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'][dateObj.getMonth()];
            const hours = dateObj.getHours().toString().padStart(2, '0');
            const minutes = dateObj.getMinutes().toString().padStart(2, '0');

            const dayOfWeek = isRussian ?
                ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][dateObj.getDay()] :
                ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()];

            return isRussian ?
                `${dayOfWeek} ${month} ${day}-го · ${hours}:${minutes}` :
                `${dayOfWeek} ${month} ${day} · ${hours}:${minutes}`;
        }
        return dateObj;
    };

    const challenges = t.communityPage.title === "Сообщество" ? [
        {
            id: 9,
            emoji: "🎯",
            title: "BINGO Challenge",
            description: "Я организую новый челлендж на @magicblock под названием BINGO! Ваша задача - внимательно прочитать каждую ячейку и либо отметить ее галочкой, либо вычеркнуть, а также процитировать этот пост и поделиться своими результатами. Вы можете заметить, что некоторые ячейки легко понять, а другие предназначены для тех, кто действительно погружен в мир магии и волшебства #magicblock. Давайте посмотрим, насколько вы настоящий волшебник! 🧙‍♂️",
            image: "challenges/bingo.jpg",
            authorAvatars: ["avatars/weeklang.jpg"],
            authorNames: ["Weeklang (@Yurii_week)"],
            tweetLink: "https://x.com/Yurii_week/status/2014632100223594522",
            hashtags: ["#MagicBlock", "#BINGO", "#Challenge"]
        },
        {
            id: 10,
            emoji: "🎨",
            title: "Favorite game challange",
            description: "gMagic друзья! Я запускаю челлендж, где вам нужно нарисовать арт, связанный с вашей любимой игрой. Моя любимая игра - Dota 2, поэтому волшебник играет в нее. С нетерпением жду ваших работ!",
            image: "challenges/dota-art.jpg",
            authorAvatars: ["avatars/l1ndlee.jpg"],
            authorNames: ["l1ndleee.base.eth (@l1ndlee)"],
            tweetLink: "https://x.com/l1ndlee/status/2014527891788062715",
            hashtags: ["#MagicBlock", "#Dota2", "#ArtChallenge"]
        },
        {
            id: 11,
            emoji: "🏆",
            title: "Achievements Showcase Challenge",
            description: "Покажи свои достижения в @magicblock. Процитируй мой пост и отметь галочками пункты, где выполнены ваши баллы 🔥",
            image: "challenges/achievements.jpg",
            authorAvatars: ["avatars/bogdan.jpg"],
            authorNames: ["Bogdan (❖,❖) (@absBogdan)"],
            tweetLink: "https://x.com/absBogdan/status/2014498005682057261",
            hashtags: ["#MagicBlock", "#Achievements", "#Showcase"]
        },
        {
            id: 12,
            emoji: "🔍",
            title: "The Muggle Hunt",
            description: "Запускаю новый челлендж - The Muggle Hunt✨ Если вы, как и я, любите атмосферу Гарри Поттера, то это для вас🪄 Что нужно сделать: напишите мне в личные сообщения, используйте слово Muggle, чтобы получить свою карточку с фото разыскиваемого. Опубликуйте ее и напишите краткое описание того, что вам больше всего нравится в фильмах о Гарри Поттере. Поделитесь мыслями о том, как магия из фильма может быть связана с MagicBlock. Не забудьте процитировать ретвит этого поста💜 Давайте найдем всех маглов вместе👀",
            image: "challenges/muggle-hunt.jpg",
            authorAvatars: ["avatars/garbar.jpg"],
            authorNames: ["Garbar (@garbar27)"],
            tweetLink: "https://x.com/garbar27/status/2014395262808457221",
            hashtags: ["#MagicBlock", "#MuggleHunt", "#HarryPotter"]
        },
        {
            id: 1,
            emoji: "🎮",
            title: "Game Creation Challenge",
            description: "Создай любую крутую игру, выложи в Twitter с тегами @magicblock и @himas.somi. Автор обязательно поддержит тебя! Пример игры от автора — Magic Jumper.",
            image: "challenges/game-creation.webp",
            authorAvatars: ["avatars/himas.jpg"],
            authorNames: ["@himas.somi"],
            tweetLink: "https://x.com/tomatofroots/status/2010018300101558473",
            hashtags: ["#MagicBlock", "#GameDev"]
        },
        {
            id: 2,
            emoji: "🎨",
            title: "Half-Wizard Challenge",
            description: "Волшебник обрёл себя с MagicBlock! Нарисуй продолжение истории, добавь текст 'Life After MagicBlock' к своему арту и сделай quote retweet поста авторов.",
            image: "challenges/half-wizard.webp",
            authorAvatars: ["avatars/wtf4uk.jpg", "avatars/yurii_week.jpg"],
            authorNames: ["@wtf4uk", "@Yurii_week"],
            tweetLink: "https://x.com/wtf4uk/status/2011002262693224759",
            hashtags: ["#MagicBlock", "#ArtChallenge"]
        },
        {
            id: 3,
            emoji: "📖",
            title: "Secret Participant Diary",
            description: "Garbar запускает челлендж 'Тайный дневник участника MagicBlock'. Напиши автору в личные сообщения для персонального дневника.",
            image: "challenges/secret-diary.webp",
            authorAvatars: ["avatars/garbar.jpg"],
            authorNames: ["Garbar"],
            tweetLink: "https://x.com/garbar27/status/2011697269150793862",
            hashtags: ["#MagicBlock", "#Community"]
        },
        {
            id: 4,
            emoji: "🧙‍♂️",
            title: "The Wizard's Ephemeral Block",
            description: "Продолжи историю волшебника, который смог прикоснуться к таинственному эфемерному блоку. Покажи, какие двери открылись для него.",
            image: "challenges/wizards-block.webp",
            authorAvatars: ["avatars/saiho.jpg"],
            authorNames: ["Saiho"],
            tweetLink: "https://x.com/saihorhys/status/2011531009607467137?s=20",
            hashtags: ["#MagicBlock", "#Storytelling"]
        },
        {
            id: 5,
            emoji: "📸",
            title: "Random Picture with Magic",
            description: "Выбери случайное фото из галереи, объясни что ты делаешь, добавь магического маскота. Пример от автора: 'Пытался впервые научиться сноубордингу'.",
            image: "challenges/random-photo.webp",
            authorAvatars: ["avatars/cryptoshi.jpg"],
            authorNames: ["Cryptoshi | Bulk"],
            tweetLink: "https://x.com/cryptoshi_eth/status/2010583869851152841",
            hashtags: ["#MagicBlock", "#PhotoChallenge"]
        },
        {
            id: 6,
            emoji: "🧙‍♂️",
            title: "Build Your Wizard Challenge",
            description: "Собери своего уникального Волшебника! Добавь 4 магических предмета к шаблону, объясни их значение в твите.",
            image: "challenges/build-wizard.webp",
            authorAvatars: ["avatars/crypto-viktor.jpg"],
            authorNames: ["Crypto Viktor"],
            tweetLink: "https://x.com/0xCryptoViktor_/status/2011714581974986854?s=20",
            hashtags: ["#MagicBlock", "#WizardChallenge"]
        },
        {
            id: 7,
            emoji: "🏆",
            title: "Community Certificate Challenge",
            description: "Я создал сертификат для сообщества MagicBlock, который покажет вашу преданность. Однако вам также нужно будет ответить на 3 вопроса викторины, на которые смогут правильно ответить только самые преданные участники сообщества.",
            image: "challenges/pfp-generatorr.webp",
            authorAvatars: ["avatars/garbar.jpg"],
            authorNames: ["Garbar"],
            tweetLink: "https://x.com/garbar27/status/2013172329266758023",
            hashtags: ["#MagicBlock", "#Certificate", "#Quiz"],
            specialNote: "Ссылка на викторину: https://community-certificate-vercel.vercel.app"
        },
        {
            id: 8,
            emoji: "✨",
            title: "MagicBlock Profile Picture Generator",
            description: "Мы с @0xCryptoViktor_ создали сайт, где можно создавать аватары в стиле MagicBlock. Попробуйте и поделитесь своим фидбеком!",
            image: "challenges/pfp-generator.webp",
            authorAvatars: ["avatars/cryptoshi.jpg", "avatars/crypto-viktor.jpg"],
            authorNames: ["Cryptoshi | Bulk", "@0xCryptoViktor_"],
            tweetLink: "https://x.com/cryptoshi_eth/status/2013491690124824714",
            specialNote: "https://magicblock-pfp-generator.netlify.app",
            hashtags: ["#MagicBlock", "#PFP", "#Generator", "#WebApp"]
        }
    ] : [
        {
            id: 9,
            emoji: "🎯",
            title: "BINGO Challenge",
            description: "I'm organizing a new challenge on @magicblock called BINGO! Your task is to carefully read each cell and either check it off or cross it out, and also quote this post and share your results. You may notice that some cells are easy to understand, while others are designed for those who are truly immersed in the world of magic and wizardry #magicblock. Let's see how much of a true wizard you are! 🧙‍♂️",
            image: "challenges/bingo.jpg",
            authorAvatars: ["avatars/weeklang.jpg"],
            authorNames: ["Weeklang (@Yurii_week)"],
            tweetLink: "https://x.com/Yurii_week/status/2014632100223594522",
            hashtags: ["#MagicBlock", "#BINGO", "#Challenge"]
        },
        {
            id: 10,
            emoji: "🎨",
            title: "Favorite game challange",
            description: "gMagic folks! I'm launching a challenge where you'll need to draw art related to your favorite game. My favorite game is Dota 2, so wizard is playing it. I look forward to seeing your work!",
            image: "challenges/dota-art.jpg",
            authorAvatars: ["avatars/l1ndlee.jpg"],
            authorNames: ["l1ndleee.base.eth (@l1ndlee)"],
            tweetLink: "https://x.com/l1ndlee/status/2014527891788062715",
            hashtags: ["#MagicBlock", "#Dota2", "#ArtChallenge"]
        },
        {
            id: 11,
            emoji: "🏆",
            title: "Achievements Showcase Challenge",
            description: "Show off your achievements in @magicblock. Quote my post and tick the boxes where your points are fulfilled 🔥",
            image: "challenges/achievements.jpg",
            authorAvatars: ["avatars/bogdan.jpg"],
            authorNames: ["Bogdan (❖,❖) (@absBogdan)"],
            tweetLink: "https://x.com/absBogdan/status/2014498005682057261",
            hashtags: ["#MagicBlock", "#Achievements", "#Showcase"]
        },
        {
            id: 12,
            emoji: "🔍",
            title: "The Muggle Hunt",
            description: "I'm launching a new challenge - The Muggle Hunt✨ If, like me, you love the atmosphere of Harry Potter, then this is for you🪄 What you need to do: DM me, use the word Muggle to get your Wanted photo card. Post it and write a short description of what you like most about the Harry Potter films. Share your thoughts on how the magic from the film can be related to MagicBlock. Don't forget to quote retweet to this post💜 Let's find all the Muggles together👀",
            image: "challenges/muggle-hunt.jpg",
            authorAvatars: ["avatars/garbar.jpg"],
            authorNames: ["Garbar (@garbar27)"],
            tweetLink: "https://x.com/garbar27/status/2014395262808457221",
            hashtags: ["#MagicBlock", "#MuggleHunt", "#HarryPotter"]
        },
        {
            id: 1,
            emoji: "🎮",
            title: "Game Creation Challenge",
            description: "Create any cool game, post it on Twitter with tags @magicblock and @himas.somi. The author will definitely support you! Author's example game is Magic Jumper.",
            image: "challenges/game-creation.webp",
            authorAvatars: ["avatars/himas.jpg"],
            authorNames: ["@himas.somi"],
            tweetLink: "https://x.com/tomatofroots/status/2010018300101558473",
            hashtags: ["#MagicBlock", "#GameDev"]
        },
        {
            id: 2,
            emoji: "🎨",
            title: "Half-Wizard Challenge",
            description: "The wizard found himself with MagicBlock! Draw a continuation of the story, add the text 'Life After MagicBlock' to your art and make a quote retweet of the authors' post.",
            image: "challenges/half-wizard.webp",
            authorAvatars: ["avatars/wtf4uk.jpg", "avatars/yurii_week.jpg"],
            authorNames: ["@wtf4uk", "@Yurii_week"],
            tweetLink: "https://x.com/wtf4uk/status/2011002262693224759",
            hashtags: ["#MagicBlock", "#ArtChallenge"]
        },
        {
            id: 3,
            emoji: "📖",
            title: "Secret Participant Diary",
            description: "Garbar launches the 'Secret Diary of a MagicBlock Participant' challenge. Write to the author in private messages for a personal diary.",
            image: "challenges/secret-diary.webp",
            authorAvatars: ["avatars/garbar.jpg"],
            authorNames: ["Garbar"],
            tweetLink: "https://x.com/garbar27/status/2011697269150793862",
            hashtags: ["#MagicBlock", "#Community"]
        },
        {
            id: 4,
            emoji: "🧙‍♂️",
            title: "The Wizard's Ephemeral Block",
            description: "Continue the story of a wizard who was able to touch a mysterious ephemeral block. Show what doors have opened for him.",
            image: "challenges/wizards-block.webp",
            authorAvatars: ["avatars/saiho.jpg"],
            authorNames: ["Saiho"],
            tweetLink: "https://x.com/saihorhys/status/2011531009607467137?s=20",
            hashtags: ["#MagicBlock", "#Storytelling"]
        },
        {
            id: 5,
            emoji: "📸",
            title: "Random Picture with Magic",
            description: "Choose a random photo from the gallery, explain what you are doing, add a magical mascot. Example from the author: 'Tried to learn snowboarding for the first time'.",
            image: "challenges/random-photo.webp",
            authorAvatars: ["avatars/cryptoshi.jpg"],
            authorNames: ["Cryptoshi | Bulk"],
            tweetLink: "https://x.com/cryptoshi_eth/status/2010583869851152841",
            hashtags: ["#MagicBlock", "#PhotoChallenge"]
        },
        {
            id: 6,
            emoji: "🧙‍♂️",
            title: "Build Your Wizard Challenge",
            description: "Build your unique Wizard! Add 4 magical items to the template, explain their meaning in a tweet.",
            image: "challenges/build-wizard.webp",
            authorAvatars: ["avatars/crypto-viktor.jpg"],
            authorNames: ["Crypto Viktor"],
            tweetLink: "https://x.com/0xCryptoViktor_/status/2011714581974986854?s=20",
            hashtags: ["#MagicBlock", "#WizardChallenge"]
        },
        {
            id: 7,
            emoji: "🏆",
            title: "Community Certificate Challenge",
            description: "I have created a certificate for the MagicBlock community that will show your dedication. However, you will also need to answer 3 quiz questions that only the most dedicated members of the community will be able to answer correctly.",
            image: "challenges/pfp-generatorr.webp",
            authorAvatars: ["avatars/garbar.jpg"],
            authorNames: ["Garbar"],
            tweetLink: "https://x.com/garbar27/status/2013172329266758023",
            hashtags: ["#MagicBlock", "#Certificate", "#Quiz"],
            specialNote: "Quiz link: https://community-certificate-vercel.vercel.app"
        },
        {
            id: 8,
            emoji: "✨",
            title: "MagicBlock Profile Picture Generator",
            description: "We built a website with @0xCryptoViktor_ where you can create MagicBlock-style profile pictures. Try it out and share your feedback!",
            image: "challenges/pfp-generator.webp",
            authorAvatars: ["avatars/cryptoshi.jpg", "avatars/crypto-viktor.jpg"],
            authorNames: ["Cryptoshi | Bulk", "@0xCryptoViktor_"],
            tweetLink: "https://x.com/cryptoshi_eth/status/2013491690124824714",
            specialNote: "https://magicblock-pfp-generator.netlify.app",
            hashtags: ["#MagicBlock", "#PFP", "#Generator", "#WebApp"]
        }
    ];

    const eventTemplates = t.communityPage.title === "Сообщество" ? [
        {
            id: 8,
            emoji: "♟️",
            title: "Cross Community Chess Tourney",
            description: "Турнир по шахматам с участием пяти проектов: Fogochain, Raiku, Pyth, SOON и Magicblock. Соревнуйтесь с другими комьюнити и выигрывайте призы!",
            baseDate: new Date(2026, 0, 30, 15, 0, 0),
            frequency: "once",
            discordLink: "https://discord.gg/magicblock",
            roleMention: "@All",
            participants: 150,
            image: "/events/chess-tourney.jpg",
            author: "MagicBlock Community",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Разовый турнир - 30 декабря 2025",
        },
        {
            id: 9,
            emoji: "🎮",
            title: "Tetris Battle Royale",
            description: "Классический тетрис в формате PvP battle royale. Играйте друг против друга, выживает сильнейший!",
            baseDate: new Date(2026, 0, 30, 20, 0, 0),
            frequency: "once",
            discordLink: "https://discord.gg/magicblock",
            roleMention: "@Gamers",
            participants: 80,
            image: "/events/tetris-battle.jpg",
            author: "MagicBlock Community",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Разовый ивент - 30 декабря 2025",
        },
        {
            id: 1,
            emoji: "☕",
            title: "Daily Community Hang + Games",
            description: "Ежедневные встречи сообщества с играми, артом от @viktor_0x, общением и хаосом. Идеальное время для знакомства с участниками MagicBlock.",
            baseDate: new Date(2025, 0, 30, 12, 0, 0),
            frequency: "daily",
            discordLink: "https://discord.com/events/943797222162726962/1442438440212762674",
            roleMention: "@All",
            participants: 85,
            image: "/events/daily-hang.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Повторяется каждый будний день (с понедельника по пятницу)"
        },
        {
            id: 2,
            emoji: "🔍",
            title: "Find the MagicBlock Logo",
            description: "Проверь своё зрение! Во время ивента будет серия картинок, в каждой из которых спрятан логотип MagicBlock. Найди все спрятанные логотипы быстрее других.",
            baseDate: new Date(2025, 0, 28, 10, 0, 0),
            frequency: "weekly",
            discordLink: "https://discord.com/events/943797222162726962/1445274005979267202",
            roleMention: "@Gamers",
            participants: 60,
            image: "/events/find-logo.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Повторяется каждую неделю (среда)"
        },
        {
            id: 3,
            emoji: "🎤",
            title: "Weekly Karaoke",
            description: "Еженедельное караоке без автотюна! Записывайся по ссылке: https://forms.gle/Y4CwaabYTtYP9Fpf7. Покажи свой вокальный талант сообществу MagicBlock.",
            baseDate: new Date(2025, 0, 28, 13, 0, 0),
            frequency: "weekly",
            discordLink: "https://discord.com/events/943797222162726962/1457599678546968731",
            roleMention: "@All",
            participants: 40,
            image: "/events/karaoke.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Повторяется каждую неделю (среда)"
        },
        {
            id: 4,
            emoji: "♠️",
            title: "Weekly Poker",
            description: "Еженедельный покерный турнир. Затачивай свои навыки, читай стол и правильно разыгрывай свои руки. Важно: убедись, что твой ник в турнире совпадает с Discord именем.",
            baseDate: new Date(2025, 0, 28, 17, 0, 0),
            frequency: "weekly",
            discordLink: "https://discord.com/events/943797222162726962/1392935313470394499",
            roleMention: "@Gamers",
            participants: 55,
            image: "/events/poker.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Повторяется каждую неделю (среда)"
        },
        {
            id: 5,
            emoji: "🧠",
            title: "Weekly Community Quiz",
            description: "Еженедельная викторина о MagicBlock. Проверь свои знания, покажи свои навыки и докажи, что ты настоящий эксперт экосистемы.",
            baseDate: new Date(2025, 0, 30, 19, 0, 0),
            frequency: "weekly",
            discordLink: "https://discord.com/events/943797222162726962/1461606137701994773",
            roleMention: "@All",
            participants: 75,
            image: "/events/quiz.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Повторяется каждую неделю (пятница)"
        },
        {
            id: 6,
            emoji: "🎨",
            title: "Community Content Review Call",
            description: "Разбор магических творений сообщества. Каждые две недели мы собираемся, чтобы оценить лучшие работы участников и обсудить новые идеи.",
            baseDate: new Date(2025, 1, 5, 11, 30, 0),
            frequency: "biweekly",
            discordLink: "https://discord.com/events/943797222162726962/1463389054069637266",
            roleMention: "@Creators",
            participants: 35,
            image: "/events/content-review.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Повторяется раз в две недели (четверг)"
        },
        {
            id: 7,
            emoji: "🎙️",
            title: "Founder Chat with Andrea (SuperMarioBlock)",
            description: "Ежемесячная встреча с основателем Андреа. Свежие анонсы MagicBlock, что происходит за кулисами и что готовится в будущем. Уникальная возможность задать вопросы напрямую.",
            baseDate: new Date(2025, 1, 5, 12, 0, 0),
            frequency: "monthly",
            discordLink: "https://discord.com/events/943797222162726962/1442714728517603459",
            roleMention: "@All",
            participants: 120,
            image: "/events/founder-chat.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Повторяется ежемесячно (первый четверг)"
        }
    ] : [
        {
            id: 8,
            emoji: "♟️",
            title: "Cross Community Chess Tourney",
            description: "Chess tournament featuring five projects: Fogochain, Raiku, Pyth, SOON, and Magicblock. Compete with other communities and win prizes!",
            baseDate: new Date(2026, 0, 30, 15, 0, 0),
            frequency: "once",
            discordLink: "https://discord.gg/magicblock",
            roleMention: "@All",
            participants: 150,
            image: "/events/chess-tourney.jpg",
            author: "MagicBlock Community",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "One-time tournament - December 30, 2025",
        },
        {
            id: 9,
            emoji: "🎮",
            title: "Tetris Battle Royale",
            description: "Good old classic tetris but in PvP battle royale format. Play against each other, only the strongest survives!",
            baseDate: new Date(2026, 0, 30, 20, 0, 0),
            frequency: "once",
            discordLink: "https://discord.gg/magicblock",
            roleMention: "@Gamers",
            participants: 80,
            image: "/events/tetris-battle.jpg",
            author: "MagicBlock Community",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "One-time event - December 30, 2025",
        },
        {
            id: 1,
            emoji: "☕",
            title: "Daily Community Hang + Games",
            description: "Daily community meetings with games, art by @viktor_0x, chatting and chaos. Perfect time to get to know MagicBlock members.",
            baseDate: new Date(2025, 0, 30, 12, 0, 0),
            frequency: "daily",
            discordLink: "https://discord.com/events/943797222162726962/1442438440212762674",
            roleMention: "@All",
            participants: 85,
            image: "/events/daily-hang.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Repeats every weekday (Monday to Friday)"
        },
        {
            id: 2,
            emoji: "🔍",
            title: "Find the MagicBlock Logo",
            description: "Test your eyesight! During the event, there will be a series of pictures, each hiding the MagicBlock logo somewhere inside. Find all hidden logos faster than others.",
            baseDate: new Date(2025, 0, 28, 10, 0, 0),
            frequency: "weekly",
            discordLink: "https://discord.com/events/943797222162726962/1445274005979267202",
            roleMention: "@Gamers",
            participants: 60,
            image: "/events/find-logo.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Repeats every week (Wednesday)"
        },
        {
            id: 3,
            emoji: "🎤",
            title: "Weekly Karaoke",
            description: "Weekly karaoke without autotune! Sign up at: https://forms.gle/Y4CwaabYTtYP9Fpf7. Show your vocal talent to the MagicBlock community.",
            baseDate: new Date(2025, 0, 28, 13, 0, 0),
            frequency: "weekly",
            discordLink: "https://discord.com/events/943797222162726962/1457599678546968731",
            roleMention: "@All",
            participants: 40,
            image: "/events/karaoke.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Repeats every week (Wednesday)"
        },
        {
            id: 4,
            emoji: "♠️",
            title: "Weekly Poker",
            description: "Weekly poker tournament. Sharpen your skills, read the table and play your hands right. Important: make sure your tournament nickname matches your Discord username.",
            baseDate: new Date(2025, 0, 28, 17, 0, 0),
            frequency: "weekly",
            discordLink: "https://discord.com/events/943797222162726962/1392935313470394499",
            roleMention: "@Gamers",
            participants: 55,
            image: "/events/poker.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Repeats every week (Wednesday)"
        },
        {
            id: 5,
            emoji: "🧠",
            title: "Weekly Community Quiz",
            description: "Weekly MagicBlock quiz. Test your knowledge, show your skills and prove you're a true ecosystem expert.",
            baseDate: new Date(2025, 0, 30, 19, 0, 0),
            frequency: "weekly",
            discordLink: "https://discord.com/events/943797222162726962/1461606137701994773",
            roleMention: "@All",
            participants: 75,
            image: "/events/quiz.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Repeats every week (Friday)"
        },
        {
            id: 6,
            emoji: "🎨",
            title: "Community Content Review Call",
            description: "Review of community's magical creations. Every two weeks we gather to evaluate the best works of participants and discuss new ideas.",
            baseDate: new Date(2025, 1, 5, 11, 30, 0),
            frequency: "biweekly",
            discordLink: "https://discord.com/events/943797222162726962/1463389054069637266",
            roleMention: "@Creators",
            participants: 35,
            image: "/events/content-review.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Repeats every two weeks (Thursday)"
        },
        {
            id: 7,
            emoji: "🎙️",
            title: "Founder Chat with Andrea (SuperMarioBlock)",
            description: "Monthly meeting with founder Andrea. Fresh MagicBlock announcements, what's happening behind the scenes and what's cooking in the future. Unique opportunity to ask questions directly.",
            baseDate: new Date(2025, 1, 5, 12, 0, 0),
            frequency: "monthly",
            discordLink: "https://discord.com/events/943797222162726962/1442714728517603459",
            roleMention: "@All",
            participants: 120,
            image: "/events/founder-chat.jpg",
            author: "mgb intern",
            authorAvatar: "/avatars/mgb intern.jpg",
            scheduleNote: "Repeats monthly (first Thursday)"
        }
    ];

    const getNextEventDate = (baseDate, frequency) => {
        const now = new Date();
        const eventDate = new Date(baseDate);

        if (frequency === 'once') {
            return eventDate;
        }

        let nextDate = new Date(eventDate);

        if (frequency === 'daily') {
            while (nextDate <= now || nextDate.getDay() === 0 || nextDate.getDay() === 6) {
                nextDate.setDate(nextDate.getDate() + 1);
            }
            nextDate.setHours(eventDate.getHours(), eventDate.getMinutes(), 0, 0);
        } else if (frequency === 'weekly') {
            const targetDay = eventDate.getDay();
            const today = now.getDay();

            let daysToAdd = targetDay - today;
            if (daysToAdd <= 0 || (daysToAdd === 0 && eventDate.getTime() <= now.getTime())) {
                daysToAdd += 7;
            }

            nextDate = new Date(now);
            nextDate.setDate(now.getDate() + daysToAdd);
            nextDate.setHours(eventDate.getHours(), eventDate.getMinutes(), 0, 0);
        } else if (frequency === 'biweekly') {
            nextDate = new Date(eventDate);
            while (nextDate <= now) {
                nextDate.setDate(nextDate.getDate() + 14);
            }
        } else if (frequency === 'monthly') {
            nextDate = new Date(eventDate);
            while (nextDate <= now) {
                nextDate.setMonth(nextDate.getMonth() + 1);
                const firstDay = new Date(nextDate.getFullYear(), nextDate.getMonth(), 1);
                let daysToAdd = (4 - firstDay.getDay() + 7) % 7;
                if (daysToAdd === 0) daysToAdd = 7;
                nextDate.setDate(1 + daysToAdd);
                nextDate.setHours(eventDate.getHours(), eventDate.getMinutes(), 0, 0);
            }
        }

        return nextDate;
    };

    const events = eventTemplates.map(template => {
        const nextDate = getNextEventDate(template.baseDate, template.frequency);
        const formattedDate = formatEventDate(nextDate);

        const now = new Date();
        const eventTime = new Date(nextDate);
        const timeDiff = eventTime - now;
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        let status = "upcoming";
        if (hoursDiff < 0) {
            status = "past";
        } else if (hoursDiff <= 24) {
            status = "live";
        }

        return {
            ...template,
            date: formattedDate,
            timestamp: eventTime.getTime(),
            status: status,
            displayParticipants: template.participants + (t.communityPage.title === "Сообщество" ? " участников" : " participants")
        };
    });

    const sortedEvents = [...events].sort((a, b) => a.timestamp - b.timestamp);
    const upcomingEvents = sortedEvents.filter(event => event.status !== "past");
    const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : sortedEvents.slice(-3);

    return (
        <div className="page hub-anim-fade-in">
            <div className="community-header">
                <h1>{community.title}</h1>
                <p className="community-subtitle">
                    {community.subtitle}
                </p>
            </div>

            <div className="section-switcher-container hub-anim-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="section-switcher">
                    <button
                        className={`section-tab ${activeSection === 'challenges' ? 'active' : ''}`}
                        onClick={() => setActiveSection('challenges')}
                    >
                        <span className="tab-emoji">🏆</span>
                        <span className="tab-text">{community.challenges}</span>
                        <span className="tab-count">{challenges.length}</span>
                    </button>

                    <button
                        className={`section-tab ${activeSection === 'events' ? 'active' : ''}`}
                        onClick={() => setActiveSection('events')}
                    >
                        <span className="tab-emoji">🎯</span>
                        <span className="tab-text">{community.events}</span>
                        <span className="tab-count">{upcomingEvents.length}</span>
                    </button>
                </div>
            </div>

            <div className="mobile-section-nav">
                <button
                    className={`nav-arrow ${activeSection === 'challenges' ? 'active' : ''}`}
                    onClick={() => setActiveSection('challenges')}
                >
                    <span className="arrow-icon">←</span>
                    <span className="arrow-label">{community.challenges}</span>
                </button>

                <button
                    className={`nav-arrow ${activeSection === 'events' ? 'active' : ''}`}
                    onClick={() => setActiveSection('events')}
                >
                    <span className="arrow-label">{community.events}</span>
                    <span className="arrow-icon">→</span>
                </button>
            </div>

            {activeSection === 'challenges' && (
                <div className="challenges-section hub-anim-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="section-header">
                        <h2 className="section-title">
                            <span className="title-icon">🏆</span>
                            {community.challengesTitle}
                            <span className="title-badge">{challenges.length} {community.activeChallenges}</span>
                        </h2>
                        <div className="section-description">
                            <p>{community.challengesDescription}</p>
                        </div>
                    </div>

                    <div className="challenges-grid">
                        {challenges.map((challenge) => (
                            <div key={challenge.id} className="challenge-card hub-anim-reveal-up"
                                style={{ animationDelay: `${0.1 * challenge.id}s` }}>
                                <div className="challenge-image-container">
                                    <span className="challenge-emoji">{challenge.emoji}</span>
                                    <div className="challenge-image-wrapper">
                                        <img
                                            src={challenge.image}
                                            alt={challenge.title}
                                            className="challenge-image"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBhMTUxMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNGRkQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBvZiB7e2NoYWxsZW5nZS50aXRsZX19PC90ZXh0Pjwvc3ZnPg==";
                                            }}
                                        />

                                        <div className="author-avatars">
                                            {challenge.authorAvatars.map((avatar, _index) => (
                                                <div key={_index} className="author-avatar-wrapper">
                                                    <img
                                                        src={avatar}
                                                        alt={challenge.authorNames[_index]}
                                                        className="author-avatar"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkQ3MDAiLz48dGV4dCB4PSIyMCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzBhMTUxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+e3tjaGFyQXQwfX08L3RleHQ+PC9zdmc+".replace('{{charAt0}}', challenge.authorNames[_index]?.charAt(0) || '?');
                                                        }}
                                                    />
                                                    {challenge.authorAvatars.length > 1 && _index === 0 && (
                                                        <div className="avatar-count">+{challenge.authorAvatars.length - 1}</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="challenge-content">
                                    <h3>{challenge.title}</h3>
                                    <p className="challenge-description">{challenge.description}</p>

                                    <div className="challenge-meta">
                                        <div className="challenge-authors">
                                            <span className="meta-label">{community.authorLabel}</span>
                                            {challenge.authorNames.map((name, _index) => (
                                                <span key={_index} className="author-name">{name}</span>
                                            ))}
                                        </div>

                                        <div className="challenge-tags">
                                            {challenge.hashtags.map((tag, _index) => (
                                                <span key={_index} className="hashtag">#{tag.replace('#', '')}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={challenge.tweetLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="challenge-button"
                                    >
                                        <span>{community.participate}</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M23 1L1 23M23 1H9M23 1V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeSection === 'events' && (
                <div className="events-section hub-anim-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="section-header">
                        <div className="section-header-top">
                            <h2 className="section-title">
                                <span className="title-icon">🎯</span>
                                {community.eventsTitle}
                                <span className="title-badge">
                                    {upcomingEvents.length} {t.communityPage.title === "Сообщество" ? "активных" : "active"}
                                </span>
                            </h2>
                        </div>

                        {upcomingEvents.length === 0 ? (
                            <div className="no-new-events-notice">
                                <span className="notice-icon">ℹ️</span>
                                <p>{community.noEventsNotice}</p>
                            </div>
                        ) : (
                            <div className="events-schedule-info">
                                <span className="schedule-icon">📅</span>
                                <p>{t.communityPage.title === "Сообщество" ?
                                    "Ближайшие события сообщества. Все ивенты повторяются по расписанию." :
                                    "Upcoming community events. All events repeat according to schedule."}</p>
                            </div>
                        )}
                    </div>

                    <div className="events-grid-two-columns">
                        {displayEvents.map((event) => (
                            <EventCard key={event.id} event={event} community={community} t={t} />
                        ))}
                    </div>

                    {upcomingEvents.length > 0 && (
                        <div className="events-footer-note">
                            <p>{t.communityPage.title === "Сообщество" ?
                                "🎯 Все события повторяются по расписанию. Присоединяйся в Discord, чтобы не пропустить!" :
                                "🎯 All events repeat according to schedule. Join Discord to stay updated!"}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const EventCard = ({ event, community, t }) => {
    const _isRussian = t.communityPage.title === "Сообщество";

    return (
        <div className="event-card hub-anim-reveal-up">
            <div className="event-author">
                <div className="event-author-info">
                    <img
                        src={event.authorAvatar}
                        alt={event.author}
                        className="event-author-avatar"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkQ3MDAiLz48dGV4dCB4PSIyMCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzBhMTUxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzwvdGV4dD48L3N2Zz4=";
                        }}
                    />
                    <div className="event-author-details">
                        <span className="event-author-name">{event.author}</span>
                        <span className="event-author-role">{community.organizer}</span>
                    </div>
                </div>

                <div className="event-status-info">
                    <span className={`event-status ${event.status}`}>
                        {event.status === 'upcoming' ? community.statusUpcoming :
                            event.status === 'live' ? community.statusLive : community.statusPast}
                    </span>
                    <span className="event-participants">
                        <span className="participants-icon">👥</span>
                        {event.displayParticipants}
                    </span>
                </div>
            </div>

            <div className="event-image-container">
                <div className="event-emoji">{event.emoji}</div>
                <img
                    src={event.image}
                    alt={event.title}
                    className="event-main-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzBhMTUxMCIvPjx0ZXh0IHg9IjMwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNGRkQ3MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5FdmVudDwvdGV4dD48L3N2Zz4=";
                    }}
                />
                <div className="event-date-badge">
                    <span className="date-icon">📅</span>
                    <span className="event-date">{event.date}</span>
                </div>
            </div>

            <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-schedule-note">
                    <span className="schedule-note-icon">
                        {event.frequency === 'once' ? '📅' : '🔄'}
                    </span>
                    <span className="schedule-note-text">
                        {event.scheduleNote}
                    </span>
                </div>

                <div className="event-details">
                    <div className="event-detail">
                        <span className="detail-icon">⏰</span>
                        <div className="detail-content">
                            <span className="detail-label">{community.dateLabel}</span>
                            <span className="detail-value">
                                {event.date}
                            </span>
                        </div>
                    </div>

                    <div className="event-detail">
                        <span className="detail-icon">👥</span>
                        <div className="detail-content">
                            <span className="detail-label">{community.forWhom}</span>
                            <span className="detail-value">{event.roleMention}</span>
                        </div>
                    </div>
                </div>

                <div className="event-actions">
                    <a
                        href={event.discordLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="event-action-btn discord-btn"
                    >
                        <span>{community.joinDiscord}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                        </svg>
                    </a>

                    <a
                        href={event.discordLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="event-action-btn reminder-btn"
                    >
                        <span>{community.setReminder}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </a>
                </div>

                <div className="event-motivation">
                    <span className="motivation-icon">🔥</span>
                    <p>{community.motivation}</p>
                </div>
            </div>
        </div>
    );
};

const NewsPage = ({ t }) => {
    const newsT = t.newsPage;
    const [expandedNews, setExpandedNews] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const news = t.newsPage.title === "Новости & Анонсы" ? [
        {
            id: 1,
            title: "Анонс MagicBlock Presale",
            date: "5 февраля 2026",
            category: "token",
            image: "/news/presale.jpg",
            status: "upcoming",
            shortDescription: "Анонс пресейла токена $BLOCK, который децентрализует сеть Ephemeral Rollups и открывает новую эру onchain-приложений.",
            fullContent: `Solana доказала, что высокая пропускная способность и низкие комиссии открывают широкий класс приложений в блокчейне.

Мы верим, что история Web3 только начинается. Мы верим в будущее, где любое приложение может быть полностью построено на блокчейне и стать проверяемым, совместимым и неостанавливаемым. Но для разблокировки еще большего класса приложений, таких как высокочастотный трейдинг, игры с монетизацией и приватные приложения, требуется сверхнизкая задержка и незначительные вычислительные затраты.

Это наша конечная цель: замена AWS и облачных провайдеров.

MagicBlock конкурирует с традиционными серверами, предоставляя разработчикам Solana децентрализованную альтернативу для вычислений в реальном времени. Вместо запуска логики приложений через централизованные серверы разработчики могут полагаться на сеть Ephemeral Rollups (ER), которая обеспечивает низкую задержку (<50 мс), приватное состояние и настройку среды выполнения по требованию, оставаясь при этом совместимой с ликвидностью Solana и общим состоянием.

Несколько месяцев назад мы запустили MagicNet и начали проверять нашу концепцию в реальном мире. С тех пор сеть обработала 1 миллиард транзакций с 250 тысячами делегирований на 27 тысяч уникальных адресов.

MagicNet включает разнообразные приложения реального времени: tap-to-trade (Rush, Banana Zone, Bloxwap), игры с монетизацией (Supersize, DOLERO, Battle Chaos), стриминговые платформы (Vorld), приватные примитивы (Loyal, Cloak) и DePIN (dTelecom).

Что такое $BLOCK?
$BLOCK — это сетевой токен. Он координирует и стимулирует набор операторов узлов ER, которые предоставляют вычисления в реальном времени для приложений Solana. Операторы узлов стейкуют $BLOCK для участия, и этот стейк делает их подотчетными за свое поведение, укрепляя безопасность и надежность сети.

Как участвовать
Есть два варианта участия в пресейле:
Вариант 1: FCFS Bonding Curve (полностью разблокируется на TGE)
Вариант 1 — это кривая связывания по принципу "кто первый пришел". Ваше распределение определяется спросом и временем заявки. Этот вариант предназначен для тех, кто хочет простой механизм и токены, полностью разблокированные на TGE.

Вариант 2: Request for Allocation (фиксированная цена 100M FDV, блокировка на 1 год)
Вариант 2 — это запрос на распределение. Вы подаете сумму, которую хотите зарезервировать по фиксированной цене 100M FDV. Нет гарантии, что ваша заявка будет принята. Финальные распределения определяются после пресейла в течение недели.

Прессейл начинается 5 февраля 2026 года.`,
            links: [
                { text: "Сайт пресейла", url: "https://presale.magicblock.app" },
                { text: "Документация", url: "https://docs.magicblock.app" }
            ],
            stats: [
                { label: "Обработано транзакций", value: "1 млрд" },
                { label: "Делегирования", value: "250К" },
                { label: "Уникальные адреса", value: "27К" }
            ]
        },
        {
            id: 2,
            title: "Будущее on-chain игр на Solana начинается сегодня",
            date: "1 января 2026",
            category: "event",
            image: "/news/hackathon.jpg",
            status: "active",
            shortDescription: "Регистрация на Matrix Hackathon открыта. Хакатон проводится с 1 января по 20 февраля с призовым фондом и несколькими треками.",
            fullContent: `Регистрация на Matrix Hackathon официально открыта!

Треки хакатона включают:

🎮 PSG1-first от Play Solana
🎯 Геймификация, DeFi & Mobile Adventures от @jup_mobile
🔐 Шифрованные игры от @Arcium
🏗️ On-chain активы и программируемая игровая инфраструктура от @metaplex
⚡ Solana On-Chain & Real-Time Gaming от @magicblock

Полные условия и детали призов для каждого трека можно найти на сайте или в нашем Discord-сервере.

• Команды или отдельные разработчики могут присоединиться к серверу и искать членов команды
• Хакатон полностью онлайн и глобальный, проходит с 1 января по 20 февраля

Призы и возможности:
- Главный приз: $50,000 в SOL
- Финансирование для лучших проектов
- Интеграция в экосистему MagicBlock
- Наставничество от ведущих разработчиков Solana`,
            links: [
                { text: "Регистрация", url: "https://matrix.playsolana.com" },
                { text: "Discord", url: "https://discord.gg/playsolanaofficial" }
            ],
            highlights: [
                "Глобальный онлайн-хакатон",
                "5 специализированных треков",
                "Призовой фонд $50,000+",
                "Наставничество от индустрии"
            ]
        },
        {
            id: 3,
            title: "Прекратите платить за хранение: ZK компрессия в Ephemeral Rollups",
            date: "12 декабря 2025",
            category: "tech",
            image: "/news/compression.jpg",
            status: "live",
            shortDescription: "MagicBlock партнерит с Light Protocol для интеграции ZK-компрессии аккаунтов, уменьшая стоимость хранения данных в 200 раз.",
            fullContent: `Мы объединились с @LightProtocol, чтобы представить новый способ взаимодействия с сжатыми аккаунтами как с обычными аккаунтами Solana.

Экономия от компрессии с удобством разработки Solana 🧵👇

💾 Что такое сжатые аккаунты?
Вместо того чтобы каждый PDA жил как отдельный платящий ренту аккаунт, миллионы аккаунтов сжимаются в один корневой хэш дерева Меркла. Только этот хэш хранится в блокчейн-аккаунте, экономя до 200x в стоимости аренды.

⚙️ Как это используется в Ephemeral Rollups
ER обнаруживает сжатые аккаунты по детерминированному сопоставлению адресов. Он извлекает состояние и ZK-доказательство из индексера, проверяет их и восстанавливает аккаунт Solana в памяти. С этого момента вы можете взаимодействовать с ним как с любым другим аккаунтом.

🔄 Фиксация состояния
При фиксации или отмене делегирования состояния ER восстанавливает новый корень Меркла и отправляет обновленное состояние и доказательство обратно в Solana. Любой сжатый аккаунт также может быть декомпрессирован в его канонический PDA, используя те же сиды для подписи.

🔓 Бесшовный опыт разработчика
Это означает, что внутри Ephemeral Rollup разработчики могут обращаться со сжатыми аккаунтами как с "обычными" аккаунтами:
• Те же SDK и клиенты
• Тот же PDA-style доступ
• Сжатое хранилище + ZK гарантии на бэкенде

🪄 Почему это меняет всё
ZK-компрессия открывает варианты использования, которые были невозможны в блокчейне раньше:
• Социальные сети
• Блокчейн-идентичность для миллиардов пользователей
• Полностью блокчейн потребительские приложения

🔮 Попробуйте демо`,
            links: [
                { text: "Демо", url: "http://compression.magicblock.app" },
                { text: "Документация Light", url: "https://docs.lightprotocol.com" }
            ],
            features: [
                "Экономия до 200x на стоимости хранения",
                "Полная совместимость с существующими SDK",
                "ZK-гарантии приватности",
                "Прямая интеграция с Ephemeral Rollups"
            ]
        },
        {
            id: 4,
            title: "Мы с гордостью спонсируем Matrix Hackathon",
            date: "28 декабря 2025",
            category: "sponsor",
            image: "/news/sponsor.jpg",
            status: "active",
            shortDescription: "MagicBlock выступает спонсором Matrix Hackathon от PlaySolana. Создавайте приложения реального времени для консоли PlaySolana.",
            fullContent: `Мы с гордостью сообщаем о спонсорстве Matrix Hackathon от @playsolana!

🎯 О хакатоне:
Matrix Hackathon — это возможность для разработчиков создать инновационные приложения реального времени для экосистемы Solana. MagicBlock выступает ключевым спонсором и технологическим партнером этого мероприятия.

🚀 Что можно построить:
Создавайте приложения реального времени для консоли PlaySolana и получите доступ к 10,000 владельцев устройств с первого дня. Хакатон фокусируется на нескольких ключевых направлениях:

• Игры реального времени на Solana
• DeFi приложения с низкой задержкой
• Социальные и мультимедийные платформы
• Инфраструктурные решения для игр

🎁 Преимущества для участников:
- Призовой фонд от MagicBlock: $25,000
- Техническая поддержка от нашей команды
- Возможность интеграции в экосистему MagicBlock
- Прямой доступ к нашим API и инструментам

📅 Регистрация откроется через 3 дня - следите за обновлениями на официальных каналах PlaySolana!

Наша миссия — поддержать следующее поколение разработчиков, создающих будущее децентрализованных приложений реального времени.`,
            links: [
                { text: "Сайт хакатона", url: "https://matrix.playsolana.com" },
                { text: "Twitter PlaySolana", url: "https://x.com/playsolana" },
                { text: "Discord", url: "https://discord.gg/playsolanaofficial" }
            ],
            highlights: [
                "Спонсорский призовой фонд: $25,000",
                "Доступ к 10,000 владельцам устройств",
                "Техподдержка от команды MagicBlock",
                "Интеграция в экосистему"
            ]
        }
    ] : [
        {
            id: 1,
            title: "MagicBlock Presale Announcement",
            date: "February 5, 2026",
            category: "token",
            image: "/news/presale.jpg",
            status: "upcoming",
            shortDescription: "Announcement of the $BLOCK token presale, which decentralizes the Ephemeral Rollups network and opens a new era of onchain applications.",
            fullContent: `Solana has proven that high throughput and low fees unlock a broad class of applications on the blockchain.

We believe the Web3 story is just beginning. We envision a future where any application can be fully built on-chain and become verifiable, composable, and unstoppable. But to unlock an even larger class of applications, such as high-frequency trading, monetized games, and private apps, ultra-low latency and negligible computation costs are required.

This is our ultimate goal: replacing AWS and cloud providers.

MagicBlock competes with traditional servers by providing Solana developers with a decentralized alternative for real-time computations. Instead of running app logic through centralized servers, developers can rely on the Ephemeral Rollups (ER) network, which delivers low latency (<50 ms), private state, and on-demand runtime customization while remaining compatible with Solana's liquidity and shared state.

A few months ago, we launched MagicNet and began validating our concept in the real world. Since then, the network has processed 1 billion transactions with 250 thousand delegations across 27 thousand unique addresses.

MagicNet includes diverse real-time applications: tap-to-trade (Rush, Banana Zone, Bloxwap), monetized games (Supersize, DOLERO, Battle Chaos), streaming platforms (Vorld), private primitives (Loyal, Cloak), and DePIN (dTelecom).

What is $BLOCK?
$BLOCK is the network token. It coordinates and incentivizes a set of ER node operators who provide real-time computations for Solana applications. Node operators stake $BLOCK to participate, and this stake holds them accountable for their behavior, strengthening the network's security and reliability.

How to Participate
There are two options for participating in the presale:
Option 1: FCFS Bonding Curve (fully unlocked at TGE)
Option 1 is a first-come-first-served bonding curve. Your allocation is determined by demand and application timing. This option is designed for those who want a simple mechanism and tokens fully unlocked at TGE.

Option 2: Request for Allocation (fixed price 100M FDV, 1-year lockup)
Option 2 is a request for allocation. You submit the amount you wish to reserve at a fixed price of 100M FDV. There is no guarantee your application will be accepted. Final allocations are determined after the presale within a week.

The presale starts on February 5, 2026.`,
            links: [
                { text: "Presale Site", url: "https://presale.magicblock.app" },
                { text: "Documentation", url: "https://docs.magicblock.app" }
            ],
            stats: [
                { label: "Transactions Processed", value: "1B" },
                { label: "Delegations", value: "250K" },
                { label: "Unique Addresses", value: "27K" }
            ]
        },
        {
            id: 2,
            title: "The Future of On-Chain Gaming on Solana Starts Today",
            date: "January 1, 2026",
            category: "event",
            image: "/news/hackathon.jpg",
            status: "active",
            shortDescription: "Registration for Matrix Hackathon is open. The hackathon runs from January 1 to February 20 with prize pools and multiple tracks.",
            fullContent: `Registration for Matrix Hackathon is officially open!

Hackathon tracks include:

🎮 PSG1-first from Play Solana
🎯 Gamification, DeFi & Mobile Adventures from @jup_mobile
🔐 Encrypted Games from @Arcium
🏗️ On-chain Assets and Programmable Gaming Infrastructure from @metaplex
⚡ Solana On-Chain & Real-Time Gaming from @magicblock

Full terms and prize details for each track can be found on the website or in our Discord server.

• Teams or individual developers can join the server and look for team members
• The hackathon is fully online and global, running from January 1 to February 20

Prizes and Opportunities:
- Grand Prize: $50,000 in SOL
- Funding for top projects
- Integration into the MagicBlock ecosystem
- Mentorship from leading Solana developers`,
            links: [
                { text: "Registration", url: "https://matrix.playsolana.com" },
                { text: "Discord", url: "https://discord.gg/playsolanaofficial" }
            ],
            highlights: [
                "Global online hackathon",
                "5 specialized tracks",
                "Prize pool $50,000+",
                "Industry mentorship"
            ]
        },
        {
            id: 3,
            title: "Stop Paying for Storage: ZK Compression in Ephemeral Rollups",
            date: "December 12, 2025",
            category: "tech",
            image: "/news/compression.jpg",
            status: "live",
            shortDescription: "MagicBlock partners with Light Protocol to integrate ZK-compression of accounts, reducing data storage costs by 200x.",
            fullContent: `We've teamed up with @LightProtocol to introduce a new way to interact with compressed accounts as regular Solana accounts.

Compression savings with Solana development convenience 🧵👇

💾 What are compressed accounts?
Instead of each PDA living as a separate rent-paying account, millions of accounts are compressed into a single Merkle tree root hash. Only this hash is stored in the blockchain account, saving up to 200x in rent costs.

⚙️ How it's used in Ephemeral Rollups
ER detects compressed accounts via deterministic address mapping. It fetches the state and ZK-proof from the indexer, verifies them, and restores the Solana account in memory. From then on, you can interact with it like any other account.

🔄 State Commitment
Upon committing or revoking state delegation, ER restores the new Merkle root and sends the updated state and proof back to Solana. Any compressed account can also be decompressed into its canonical PDA using the same seeds for signing.

🔓 Seamless Developer Experience
This means that inside an Ephemeral Rollup, developers can treat compressed accounts as "regular" accounts:
• Same SDKs and clients
• Same PDA-style access
• Compressed storage + ZK guarantees in the backend

🪄 Why this changes everything
ZK-compression unlocks use cases that were impossible on-chain before:
• Social networks
• Blockchain identity for billions of users
• Fully on-chain consumer apps

🔮 Try the demo`,
            links: [
                { text: "Demo", url: "http://compression.magicblock.app" },
                { text: "Light Documentation", url: "https://docs.lightprotocol.com" }
            ],
            features: [
                "Up to 200x savings on storage costs",
                "Full compatibility with existing SDKs",
                "ZK privacy guarantees",
                "Direct integration with Ephemeral Rollups"
            ]
        },
        {
            id: 4,
            title: "We Proudly Sponsor Matrix Hackathon",
            date: "December 28, 2025",
            category: "sponsor",
            image: "/news/sponsor.jpg",
            status: "active",
            shortDescription: "MagicBlock sponsors Matrix Hackathon from PlaySolana. Build real-time applications for the PlaySolana console.",
            fullContent: `We are proud to announce our sponsorship of Matrix Hackathon from @playsolana!

🎯 About the Hackathon:
Matrix Hackathon is an opportunity for developers to create innovative real-time applications for the Solana ecosystem. MagicBlock serves as a key sponsor and technology partner for this event.

🚀 What You Can Build:
Create real-time applications for the PlaySolana console and gain access to 10,000 device owners from day one. The hackathon focuses on several key areas:

• Real-time games on Solana
• Low-latency DeFi applications
• Social and multimedia platforms
• Infrastructure solutions for games

🎁 Benefits for Participants:
- Prize pool from MagicBlock: $25,000
- Technical support from our team
- Opportunity for integration into the MagicBlock ecosystem
- Direct access to our APIs and tools

📅 Registration opens in 3 days - stay tuned for updates on PlaySolana's official channels!

Our mission is to support the next generation of developers building the future of decentralized real-time applications.`,
            links: [
                { text: "Hackathon Site", url: "https://matrix.playsolana.com" },
                { text: "PlaySolana Twitter", url: "https://x.com/playsolana" },
                { text: "Discord", url: "https://discord.gg/playsolanaofficial" }
            ],
            highlights: [
                "Sponsorship prize pool: $25,000",
                "Access to 10,000 device owners",
                "Tech support from MagicBlock team",
                "Ecosystem integration"
            ]
        }
    ];

    const toggleNews = (id) => {
        setExpandedNews(expandedNews === id ? null : id);
    };

    const filteredNews = activeCategory === 'all'
        ? news
        : news.filter(item => item.category === activeCategory);

    return (
        <div className="page hub-anim-fade-in">
            <div className="news-header">
                <h1>{newsT.title}</h1>
                <p className="news-subtitle">
                    {newsT.subtitle}
                </p>
            </div>

            <div className="news-categories hub-anim-reveal-up" style={{ animationDelay: '0.1s' }}>
                <button
                    className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('all')}
                >
                    {newsT.allNews} ({news.length})
                </button>
                <button
                    className={`category-btn ${activeCategory === 'token' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('token')}
                >
                    {newsT.token}
                </button>
                <button
                    className={`category-btn ${activeCategory === 'event' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('event')}
                >
                    {newsT.event}
                </button>
                <button
                    className={`category-btn ${activeCategory === 'tech' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('tech')}
                >
                    {newsT.tech}
                </button>
                <button
                    className={`category-btn ${activeCategory === 'sponsor' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('sponsor')}
                >
                    {newsT.sponsor}
                </button>
            </div>

            <div className="news-grid">
                {filteredNews.map((item, index) => (
                    <div
                        key={item.id}
                        className={`news-card hub-anim-reveal-up ${expandedNews === item.id ? 'expanded' : ''}`}
                        style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    >
                        <div className={`news-badge ${item.status}`}>
                            {item.status === 'upcoming' ? newsT.statusUpcoming :
                                item.status === 'active' ? newsT.statusActive : newsT.statusLive}
                        </div>

                        <div className="news-image-container">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="news-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
                      <rect width="400" height="250" fill="#0a1510"/>
                      <rect x="20" y="20" width="360" height="180" rx="10" fill="#1a2a1a" stroke="#FFD700" stroke-width="2"/>
                      <text x="200" y="110" font-family="Arial" font-size="20" fill="#FFD700" text-anchor="middle">
                        ${item.category === 'token' ? '🚀 Token' :
                                            item.category === 'event' ? '🎯 Event' :
                                                item.category === 'tech' ? '⚙️ Technology' : '🤝 Sponsorship'}
                      </text>
                      <text x="200" y="140" font-family="Arial" font-size="16" fill="#B8D972" text-anchor="middle">
                        MagicBlock
                      </text>
                    </svg>
                  `)}`
                                }}
                            />
                            <div className="news-date-overlay">
                                <span className="date-icon">📅</span>
                                <span className="news-date-text">{item.date}</span>
                            </div>
                        </div>

                        <div className="news-content">
                            <div className="news-category-tag">
                                {item.category === 'token' && newsT.token}
                                {item.category === 'event' && newsT.event}
                                {item.category === 'tech' && newsT.tech}
                                {item.category === 'sponsor' && newsT.sponsor}
                            </div>

                            <h3 className="news-title">{item.title}</h3>
                            <p className="news-short">{item.shortDescription}</p>

                            {item.stats && (
                                <div className="news-stats">
                                    {item.stats.map((stat, idx) => (
                                        <div key={idx} className="stat-item">
                                            <span className="stat-value">{stat.value}</span>
                                            <span className="stat-label">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {item.highlights && (
                                <div className="news-highlights">
                                    {item.highlights.map((highlight, idx) => (
                                        <span key={idx} className="highlight-item">✓ {highlight}</span>
                                    ))}
                                </div>
                            )}

                            {item.features && (
                                <div className="news-features">
                                    {item.features.map((feature, idx) => (
                                        <span key={idx} className="feature-item">⚡ {feature}</span>
                                    ))}
                                </div>
                            )}

                            {expandedNews === item.id && (
                                <div className="news-full-content">
                                    <div className="content-divider"></div>
                                    <div className="full-text">
                                        {item.fullContent.split('\n').map((paragraph, idx) => (
                                            paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
                                        ))}
                                    </div>

                                    {item.links && item.links.length > 0 && (
                                        <div className="news-links">
                                            <h4>{newsT.usefulLinks}</h4>
                                            <div className="links-grid">
                                                {item.links.map((link, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="news-link-btn"
                                                    >
                                                        {link.text}
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="news-actions">
                                <button
                                    className={`expand-btn ${expandedNews === item.id ? 'expanded' : ''}`}
                                    onClick={() => toggleNews(item.id)}
                                >
                                    {expandedNews === item.id ? newsT.collapse : newsT.readMore}
                                    <span className="btn-icon">
                                        {expandedNews === item.id ? '↑' : '↓'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="news-subscribe hub-anim-reveal-up" style={{ animationDelay: '0.4s' }}>
                <div className="subscribe-icon">📰</div>
                <div className="subscribe-content">
                    <h3>{newsT.followNews}</h3>
                    <p>{newsT.followDescription}</p>
                </div>
                <a
                    href="https://x.com/magicblock"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="subscribe-btn"
                >
                    {newsT.subscribeTwitter}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

const AboutPage = ({ t }) => {
    const about = t.aboutPage;

    return (
        <div className="page hub-anim-fade-in">
            <div className="about-container">
                <div className="about-header">
                    <img src={AVATAR} alt="Tor" className="avatar-large about-avatar" />
                    <h1>{about.title}</h1>
                    <p className="about-subtitle">{about.subtitle}</p>
                </div>

                <div className="about-content">
                    <div className="about-section hub-anim-reveal-up" style={{ animationDelay: '0.1s' }}>
                        <div className="section-icon">👤</div>
                        <div className="section-text">
                            <h3>{about.aboutMe.title}</h3>
                            <p>{about.aboutMe.content1}</p>
                            <p>{about.aboutMe.content2}</p>
                        </div>
                    </div>

                    <div className="about-section hub-anim-reveal-up" style={{ animationDelay: '0.2s' }}>
                        <div className="section-icon">🎯</div>
                        <div className="section-text">
                            <h3>{about.mission.title}</h3>
                            <p>{about.mission.content1}</p>
                            <p>{about.mission.content2}</p>
                        </div>
                    </div>

                    <div className="about-section hub-anim-reveal-up" style={{ animationDelay: '0.3s' }}>
                        <div className="section-icon">🤝</div>
                        <div className="section-text">
                            <h3>{about.collaboration.title}</h3>
                            <p>{about.collaboration.content1}</p>
                            <p>{about.collaboration.content2}</p>
                        </div>
                    </div>
                </div>

                <div className="contact-cards">
                    <div className="contact-card hub-anim-reveal-up" style={{ animationDelay: '0.4s' }}>
                        <div className="contact-icon">🐦</div>
                        <h4>{about.twitter}</h4>
                        <p>@cryptoo_tor</p>
                        <a
                            href="https://x.com/cryptoo_tor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            {about.goToTwitter}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                    <div className="contact-card hub-anim-reveal-up" style={{ animationDelay: '0.6s' }}>
                        <div className="contact-icon">🎮</div>
                        <h4>{about.discord}</h4>
                        <p>@tor00_1</p>
                        <a
                            href="https://discord.com/users/tor00_1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            {about.addDiscord}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="about-footer hub-anim-reveal-up" style={{ animationDelay: '0.7s' }}>
                    <p>{about.contactInfo} <span className="highlight">@tor00_1</span></p>
                    <p className="small">{about.disclaimer}</p>
                </div>
            </div>
        </div>
    );
};

const MediaPage = ({ t }) => {
    const media = t.mediaPage;
    const [activeTab, setActiveTab] = useState('all');

    const mediaSections = [
        {
            id: 'docs',
            title: media.docsTitle,
            icon: '📚',
            items: [
                {
                    title: media.title === "Медиа и ресурсы" ? 'Ephemeral Rollup (ER)' : 'Ephemeral Rollup (ER)',
                    description: media.title === "Медиа и ресурсы" ? 'Основной продукт для выполнения транзакций в реальном времени с нулевой комиссией на Solana. Изучите архитектуру и начните интеграцию.' : 'The main product for executing real-time transactions with zero fees on Solana. Study the architecture and start integration.',
                    url: 'https://docs.magicblock.gg/',
                    type: 'docs',
                    tags: media.title === "Медиа и ресурсы" ? ['Технология', 'Основное', 'Справка'] : ['Technology', 'Core', 'Reference']
                },
                {
                    title: media.title === "Медиа и ресурсы" ? 'Private Ephemeral Rollup (PER)' : 'Private Ephemeral Rollup (PER)',
                    description: media.title === "Медиа и ресурсы" ? 'Интеграция аппаратно-защищённых сред исполнения (Intel TDX) для приватных вычислений, сохраняющая композируемость Solana.' : 'Integration of hardware-protected execution environments (Intel TDX) for private computations, preserving Solana composability.',
                    url: 'https://docs.magicblock.gg/pages/tools/tee/introduction',
                    type: 'docs',
                    tags: media.title === "Медиа и ресурсы" ? ['Приватность', 'TEE', 'Для разработчиков'] : ['Privacy', 'TEE', 'For Developers']
                },
                {
                    title: media.title === "Медиа и ресурсы" ? 'Verifiable Randomness (VRF)' : 'Verifiable Randomness (VRF)',
                    description: media.title === "Медиа и ресурсы" ? 'Генерация доказуемо честной случайности прямо в блокчейне. Ключевой примитив для игр и децентрализованных приложений.' : 'Generation of provably fair randomness directly in the blockchain. A key primitive for games and decentralized applications.',
                    url: 'https://docs.magicblock.gg/',
                    type: 'docs',
                    tags: media.title === "Медиа и ресурсы" ? ['Случайность', 'Игры', 'Инструмент'] : ['Randomness', 'Games', 'Tool']
                }
            ]
        },
        {
            id: 'tools',
            title: media.toolsTitle,
            icon: '🛠️',
            items: [
                {
                    title: media.title === "Медиа и ресурсы" ? 'Solana Unity SDK' : 'Solana Unity SDK',
                    description: media.title === "Медиа и ресурсы" ? 'Основной SDK для интеграции Solana, Metaplex и Anchor в игры на Unity. Открытый исходный код, полное покрытие RPC.' : 'Main SDK for integrating Solana, Metaplex and Anchor into Unity games. Open source, full RPC coverage.',
                    url: 'https://github.com/magicblock-labs/Solana.Unity-SDK',
                    type: 'tool',
                    tags: media.title === "Медиа и ресурсы" ? ['SDK', 'Unity', 'Игры'] : ['SDK', 'Unity', 'Games']
                },
                {
                    title: media.title === "Медиа и ресурсы" ? 'Ephemeral Rollups SDK' : 'Ephemeral Rollups SDK',
                    description: media.title === "Медиа и ресурсы" ? 'Утилиты для подготовки программ к выполнению транзакций во временных роллапах.' : 'Utilities for preparing programs to execute transactions in ephemeral rollups.',
                    url: 'https://github.com/magicblock-labs/ephemeral-rollups-sdk',
                    type: 'tool',
                    tags: media.title === "Медиа и ресурсы" ? ['SDK', 'TypeScript', 'Для разработчиков'] : ['SDK', 'TypeScript', 'For Developers']
                },
                {
                    title: media.title === "Медиа и ресурсы" ? 'Gum Protocol' : 'Gum Protocol',
                    description: media.title === "Медиа и ресурсы" ? 'Библиотека ончейн-программ для децентрализованных социальных сетей на Solana. Социальные "кирпичики" для ваших приложений.' : 'Library of on-chain programs for decentralized social networks on Solana. Social "building blocks" for your applications.',
                    url: 'https://github.com/magicblock-labs/session-keys',
                    type: 'tool',
                    tags: media.title === "Медиа и ресурсы" ? ['Социальная сеть', 'Протокол', 'Инфраструктура'] : ['Social Network', 'Protocol', 'Infrastructure']
                },
                {
                    title: media.title === "Медиа и ресурсы" ? 'Примеры интеграций' : 'Integration Examples',
                    description: media.title === "Медиа и ресурсы" ? 'Практические примеры кода для интеграции Ephemeral Rollups в различные сценарии.' : 'Practical code examples for integrating Ephemeral Rollups into various scenarios.',
                    url: 'https://github.com/magicblock-labs/magicblock-engine-examples',
                    type: 'tool',
                    tags: media.title === "Медиа и ресурсы" ? ['Примеры', 'GitHub', 'Туториал'] : ['Examples', 'GitHub', 'Tutorial']
                }
            ]
        },
        {
            id: 'videos',
            title: media.videosTitle,
            icon: '🎥',
            items: [
                {
                    title: media.title === "Медиа и ресурсы" ? 'Демонстрация Ephemeral Rollups' : 'Ephemeral Rollups Demo',
                    description: media.title === "Медиа и ресурсы" ? 'Наглядная демонстрация работы технологии Ephemeral Rollups в реальном времени. Скорость, нулевые комиссии и композируемость.' : 'Visual demonstration of Ephemeral Rollups technology in real time. Speed, zero fees and composability.',
                    url: '#',
                    type: 'video',
                    duration: '--:--',
                    tags: media.title === "Медиа и ресурсы" ? ['Демо', 'Технология'] : ['Demo', 'Technology']
                },
                {
                    title: media.title === "Медиа и ресурсы" ? 'Приватные транзакции на PER' : 'Private Transactions on PER',
                    description: media.title === "Медиа и ресурсы" ? 'Как использовать Private Ephemeral Rollup для конфиденциальных переводов и других приватных операций в блокчейне.' : 'How to use Private Ephemeral Rollup for confidential transfers and other private operations on the blockchain.',
                    url: '#',
                    type: 'video',
                    duration: '--:--',
                    tags: media.title === "Медиа и ресурсы" ? ['Демо', 'Приватность'] : ['Demo', 'Privacy']
                },
                {
                    title: media.title === "Медиа и ресурсы" ? 'Обзор архитектуры MagicBlock' : 'MagicBlock Architecture Overview',
                    description: media.title === "Медиа и ресурсы" ? 'Подробный разбор архитектуры MagicBlock и ключевых компонентов системы.' : 'Detailed analysis of MagicBlock architecture and key system components.',
                    url: '#',
                    type: 'video',
                    duration: '--:--',
                    tags: media.title === "Медиа и ресурсы" ? ['Архитектура', 'Обзор'] : ['Architecture', 'Overview']
                }
            ]
        },
        {
            id: 'community',
            title: media.communityTitle,
            icon: '🌐',
            items: [
                {
                    title: media.title === "Медиа и ресурсы" ? 'Официальный Discord' : 'Official Discord',
                    description: media.title === "Медиа и ресурсы" ? 'Присоединяйтесь к сообществу из более чем 43,000 участников. Обсуждение разработки, поддержка, анонсы.' : 'Join the community of over 43,000 members. Development discussion, support, announcements.',
                    url: 'https://discord.gg/magicblock',
                    type: 'community',
                    tags: media.title === "Медиа и ресурсы" ? ['Сообщество', 'Чат', 'Поддержка'] : ['Community', 'Chat', 'Support']
                },
                {
                    title: media.title === "Медиа и ресурсы" ? 'Официальный сайт' : 'Official Website',
                    description: media.title === "Медиа и ресурсы" ? 'Основной лендинг проекта с описанием миссии, возможностей и примерами использования.' : 'Main project landing page with mission description, capabilities and use cases.',
                    url: 'https://www.magicblock.xyz/',
                    type: 'community',
                    tags: media.title === "Медиа и ресурсы" ? ['Сайт', 'Обзор', 'Новости'] : ['Website', 'Overview', 'News']
                },
                {
                    title: media.title === "Медиа и ресурсы" ? 'GitHub Организация' : 'GitHub Organization',
                    description: media.title === "Медиа и ресурсы" ? 'Все открытые репозитории, инструменты и исходный код, поддерживаемый командой MagicBlock.' : 'All open repositories, tools and source code maintained by the MagicBlock team.',
                    url: 'https://github.com/magicblock-labs',
                    type: 'community',
                    tags: media.title === "Медиа и ресурсы" ? ['Исходный код', 'Open Source'] : ['Source Code', 'Open Source']
                }
            ]
        }
    ];

    const allItems = mediaSections.flatMap(section =>
        section.items.map(item => ({ ...item, section: section.id }))
    );

    const filteredItems = activeTab === 'all'
        ? allItems
        : allItems.filter(item => item.section === activeTab);

    return (
        <div className="page hub-anim-fade-in">
            <div className="media-header">
                <h1>{media.title}</h1>
                <p className="media-subtitle">
                    {media.subtitle}
                </p>
            </div>

            <div className="media-tabs hub-anim-reveal-up" style={{ animationDelay: '0.1s' }}>
                <button
                    className={`media-tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    <span className="tab-icon">🎯</span>
                    {media.allMaterials}
                </button>

                {mediaSections.map(section => (
                    <button
                        key={section.id}
                        className={`media-tab ${activeTab === section.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(section.id)}
                    >
                        <span className="tab-icon">{section.icon}</span>
                        {section.title}
                    </button>
                ))}
            </div>

            {activeTab === 'all' ? (
                <div className="media-sections">
                    {mediaSections.map((section, index) => (
                        <div
                            key={section.id}
                            className="media-section hub-anim-reveal-up"
                            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                        >
                            <div className="section-header">
                                <div className="section-title-icon">
                                    <span className="icon">{section.icon}</span>
                                    <h2>{section.title}</h2>
                                </div>
                                <div className="section-count">{section.items.length}</div>
                            </div>

                            <div className="media-grid">
                                {section.items.map((item, itemIndex) => (
                                    <MediaCard key={itemIndex} item={item} t={media} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="media-category-view hub-anim-fade-in">
                    <div className="category-header">
                        <h2>
                            <span className="category-icon">
                                {mediaSections.find(s => s.id === activeTab)?.icon}
                            </span>
                            {mediaSections.find(s => s.id === activeTab)?.title}
                        </h2>
                    </div>

                    <div className="media-grid detailed">
                        {filteredItems.map((item, index) => (
                            <MediaCard key={index} item={item} detailed={true} t={media} />
                        ))}
                    </div>
                </div>
            )}

            <div className="quick-links hub-anim-reveal-up" style={{ animationDelay: '0.5s' }}>
                <h3>{media.quickAccess}</h3>
                <div className="quick-links-grid">
                    <a
                        href="https://docs.magicblock.gg/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="quick-link"
                    >
                        <span className="quick-icon">📖</span>
                        <div className="quick-content">
                            <h4>{media.startDev}</h4>
                            <p>{media.startDevDesc}</p>
                        </div>
                        <span className="quick-arrow">→</span>
                    </a>

                    <a
                        href="https://github.com/magicblock-labs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="quick-link"
                    >
                        <span className="quick-icon">💻</span>
                        <div className="quick-content">
                            <h4>{media.sourceCode}</h4>
                            <p>{media.sourceCodeDesc}</p>
                        </div>
                        <span className="quick-arrow">→</span>
                    </a>

                    <a
                        href="https://www.magicblock.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="quick-link"
                    >
                        <span className="quick-icon">✨</span>
                        <div className="quick-content">
                            <h4>{media.officialSite}</h4>
                            <p>{media.officialSiteDesc}</p>
                        </div>
                        <span className="quick-arrow">→</span>
                    </a>

                    <a
                        href="https://discord.gg/magicblock"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="quick-link"
                    >
                        <span className="quick-icon">💬</span>
                        <div className="quick-content">
                            <h4>{media.joinCommunity}</h4>
                            <p>{media.joinCommunityDesc}</p>
                        </div>
                        <span className="quick-arrow">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

const MediaCard = ({ item, detailed = false, t }) => {
    const getTypeIcon = (type) => {
        switch (type) {
            case 'docs': return '📚';
            case 'video': return '🎥';
            case 'tool': return '🛠️';
            case 'community': return '🌐';
            default: return '📄';
        }
    };

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`media-card ${item.url === '#' ? 'disabled' : ''} ${detailed ? 'detailed' : ''}`}
            onClick={(e) => item.url === '#' && e.preventDefault()}
        >
            <div className="media-card-header">
                <span className="media-type-icon">{getTypeIcon(item.type)}</span>
                {item.duration && item.duration !== '--:--' && (
                    <span className="media-duration">{item.duration}</span>
                )}
            </div>

            <div className="media-card-content">
                <h3>{item.title}</h3>
                <p className="media-description">{item.description}</p>

                {item.tags && (
                    <div className="media-tags">
                        {item.tags.map((tag, idx) => (
                            <span key={idx} className="media-tag">#{tag}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="media-card-footer">
                <span className="media-link">
                    {item.url === '#' ? t.soon : t.open}
                    {item.url !== '#' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </span>
            </div>
        </a>
    );
};

const QuizPage = ({ t }) => {
    const quizT = t.quizPage;

    const questions = t.quizPage.title === "Квиз MagicBlock" ? [
        {
            id: 1,
            question: "Что такое MagicBlock?",
            options: [
                "Игра на Solana",
                "Расширение сети Solana для consumer-приложений",
                "Новый блокчейн",
                "Криптовалютный кошелек"
            ],
            correct: 1,
            explanation: "MagicBlock — это расширение сети Solana, созданное для разработки нового поколения consumer-приложений."
        },
        {
            id: 2,
            question: "Что такое Ephemeral Rollups?",
            options: [
                "Временные кошельки",
                "Новый примитив для масштабирования Solana без фрагментации состояния",
                "Токен стандарта",
                "Мобильное приложение"
            ],
            correct: 1,
            explanation: "Ephemeral Rollups — это новый примитив, представленный MagicBlock, который позволяет масштабировать Solana без фрагментации состояния."
        },
        {
            id: 3,
            question: "Какое ключевое преимущество сохраняет MagicBlock?",
            options: [
                "Низкие комиссии",
                "Композируемость",
                "Анонимность",
                "Скорость"
            ],
            correct: 1,
            explanation: "MagicBlock ускоряет и расширяет возможности Solana, при этом полностью сохраняя ее ключевое преимущество — композируемость."
        },
        {
            id: 4,
            question: "Что могут создавать разработчики с помощью MagicBlock?",
            options: [
                "Только игры",
                "Только DeFi приложения",
                "Неостанавливаемые игры и приложения, Permissionless composable приложения, Финансовые приложения с низкой задержкой",
                "Только социальные сети"
            ],
            correct: 2,
            explanation: "MagicBlock позволяет создавать неостанавливаемые игры, композируемые приложения и финансовые решения с низкой задержкой."
        },
        {
            id: 5,
            question: "Какова задержка в Ephemeral Rollups?",
            options: [
                "< 50 мс",
                "1-2 секунды",
                "5-10 секунд",
                "> 30 секунд"
            ],
            correct: 0,
            explanation: "Ephemeral Rollups обеспечивают сверхнизкую задержку (<50 мс), что критично для real-time приложений."
        },
        {
            id: 6,
            question: "Что такое Private Ephemeral Rollup (PER)?",
            options: [
                "Закрытая сеть",
                "Интеграция аппаратно-защищённых сред исполнения для приватных вычислений",
                "Приватный токен",
                "Закрытая бета-версия"
            ],
            correct: 1,
            explanation: "PER — это интеграция аппаратно-защищённых сред исполнения (Intel TDX) для приватных вычислений."
        },
        {
            id: 7,
            question: "Какой SDK используется для интеграции с Unity?",
            options: [
                "Solana Web3.js",
                "Anchor",
                "Solana Unity SDK",
                "Metaplex SDK"
            ],
            correct: 2,
            explanation: "Solana Unity SDK — это основной SDK для интеграции Solana, Metaplex и Anchor в игры на Unity."
        },
        {
            id: 8,
            question: "Сколько транзакций обработала сеть MagicNet?",
            options: [
                "1 миллион",
                "10 миллионов",
                "100 миллионов",
                "1 миллиард"
            ],
            correct: 3,
            explanation: "MagicNet обработала 1 миллиард транзакций с 250 тысячами делегирований."
        },
        {
            id: 9,
            question: "Что такое $BLOCK токен?",
            options: [
                "Токен для стейкинга",
                "Сетевой токен для координации операторов узлов",
                "Игровая валюта",
                "Governance токен"
            ],
            correct: 1,
            explanation: "$BLOCK — это сетевой токен, который координирует и стимулирует набор операторов узлов ER."
        },
        {
            id: 10,
            question: "Что такое ZK-компрессия в Ephemeral Rollups?",
            options: [
                "Сжатие видео",
                "Технология уменьшения стоимости хранения данных в 200 раз",
                "Сжатие аудио",
                "Оптимизация кода"
            ],
            correct: 1,
            explanation: "ZK-компрессия позволяет уменьшить стоимость хранения данных в 200 раз, сохраняя ZK-гарантии приватности."
        }
    ] : [
        {
            id: 1,
            question: "What is MagicBlock?",
            options: [
                "A game on Solana",
                "Solana network extension for consumer applications",
                "A new blockchain",
                "Cryptocurrency wallet"
            ],
            correct: 1,
            explanation: "MagicBlock is a Solana network extension designed for developing the next generation of consumer applications."
        },
        {
            id: 2,
            question: "What are Ephemeral Rollups?",
            options: [
                "Temporary wallets",
                "A new primitive for scaling Solana without state fragmentation",
                "Token standard",
                "Mobile application"
            ],
            correct: 1,
            explanation: "Ephemeral Rollups is a new primitive introduced by MagicBlock that allows scaling Solana without state fragmentation."
        },
        {
            id: 3,
            question: "What key advantage does MagicBlock preserve?",
            options: [
                "Low fees",
                "Composability",
                "Anonymity",
                "Speed"
            ],
            correct: 1,
            explanation: "MagicBlock accelerates and expands Solana's capabilities while fully preserving its key advantage - composability."
        },
        {
            id: 4,
            question: "What can developers build with MagicBlock?",
            options: [
                "Only games",
                "Only DeFi applications",
                "Unstoppable games and applications, Permissionless composable applications, Low-latency financial applications",
                "Only social networks"
            ],
            correct: 2,
            explanation: "MagicBlock allows creating unstoppable games, composable applications, and low-latency financial solutions."
        },
        {
            id: 5,
            question: "What is the latency in Ephemeral Rollups?",
            options: [
                "< 50 ms",
                "1-2 seconds",
                "5-10 seconds",
                "> 30 seconds"
            ],
            correct: 0,
            explanation: "Ephemeral Rollups provide ultra-low latency (<50 ms), critical for real-time applications."
        },
        {
            id: 6,
            question: "What is Private Ephemeral Rollup (PER)?",
            options: [
                "Closed network",
                "Integration of hardware-protected execution environments for private computations",
                "Private token",
                "Closed beta version"
            ],
            correct: 1,
            explanation: "PER is the integration of hardware-protected execution environments (Intel TDX) for private computations."
        },
        {
            id: 7,
            question: "Which SDK is used for Unity integration?",
            options: [
                "Solana Web3.js",
                "Anchor",
                "Solana Unity SDK",
                "Metaplex SDK"
            ],
            correct: 2,
            explanation: "Solana Unity SDK is the main SDK for integrating Solana, Metaplex and Anchor into Unity games."
        },
        {
            id: 8,
            question: "How many transactions has MagicNet processed?",
            options: [
                "1 million",
                "10 million",
                "100 million",
                "1 billion"
            ],
            correct: 3,
            explanation: "MagicNet has processed 1 billion transactions with 250 thousand delegations."
        },
        {
            id: 9,
            question: "What is the $BLOCK token?",
            options: [
                "Staking token",
                "Network token for coordinating node operators",
                "Game currency",
                "Governance token"
            ],
            correct: 1,
            explanation: "$BLOCK is the network token that coordinates and incentivizes a set of ER node operators."
        },
        {
            id: 10,
            question: "What is ZK compression in Ephemeral Rollups?",
            options: [
                "Video compression",
                "Technology that reduces data storage costs by 200x",
                "Audio compression",
                "Code optimization"
            ],
            correct: 1,
            explanation: "ZK compression allows reducing data storage costs by 200x while preserving ZK privacy guarantees."
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState("");
    const [_avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [certificateGenerated, setCertificateGenerated] = useState(false);
    const [certificateData, setCertificateData] = useState(null);

    const handleAnswer = (questionId, optionIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) {
                correct++;
            }
        });
        setScore(correct);
        return correct;
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setQuizCompleted(true);

        if (finalScore >= 8) {
            const savedCert = localStorage.getItem(`magicblock_cert_${username}`);
            if (savedCert) {
                setCertificateData(JSON.parse(savedCert));
                setCertificateGenerated(true);
            }
        }
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateCertificate = () => {
        if (!username.trim()) {
            alert(quizT.usernameRequired);
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 1200;
        canvas.height = 800;

        ctx.fillStyle = '#0a0515';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, '#8B5CF6');
        gradient.addColorStop(0.5, '#A855F7');
        gradient.addColorStop(1, '#06B6D4');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 10;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        ctx.fillStyle = '#8B5CF6';
        ctx.font = 'bold 60px Orbitron, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 20;
        ctx.fillText('MAGIC BLOCK', canvas.width / 2, 120);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#A855F7';
        ctx.font = 'bold 40px Inter, sans-serif';
        ctx.fillText(quizT.certificateTitle, canvas.width / 2, 180);

        ctx.fillStyle = '#06B6D4';
        ctx.font = 'bold 60px Orbitron, sans-serif';
        ctx.fillText('CERTIFICATE', canvas.width / 2, 250);

        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Inter, sans-serif';
        ctx.textAlign = 'center';

        const certificateText = quizT.certificateText.replace('{username}', username);

        const maxWidth = 800;
        const words = certificateText.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        const startY = 350;
        const lineHeight = 45;
        lines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
        });

        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 36px Orbitron, sans-serif';
        ctx.fillText(`${quizT.score.replace('{score}', score)}`, canvas.width / 2, 500);

        const date = new Date().toLocaleDateString(t.quizPage.title === "Квиз MagicBlock" ? 'ru-RU' : 'en-US');
        ctx.fillStyle = '#B8D972';
        ctx.font = '20px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${quizT.date} ${date}`, 100, 650);

        ctx.textAlign = 'right';
        ctx.fillText(`${quizT.signature} ${quizT.torSignature}`, canvas.width - 100, 650);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#8B5CF6';
        ctx.font = 'bold 28px Orbitron, sans-serif';
        ctx.fillText(quizT.magicBlockSeal, canvas.width / 2, 750);

        if (avatarPreview) {
            const img = new Image();
            img.onload = () => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(150, 500, 50, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(img, 100, 450, 100, 100);
                ctx.restore();

                const certificateUrl = canvas.toDataURL('image/png');
                const certData = {
                    username,
                    score,
                    date,
                    certificateUrl
                };

                setCertificateData(certData);
                localStorage.setItem(`magicblock_cert_${username}`, JSON.stringify(certData));
                setCertificateGenerated(true);
            };
            img.src = avatarPreview;
        } else {
            const certificateUrl = canvas.toDataURL('image/png');
            const certData = {
                username,
                score,
                date,
                certificateUrl
            };

            setCertificateData(certData);
            localStorage.setItem(`magicblock_cert_${username}`, JSON.stringify(certData));
            setCertificateGenerated(true);
        }
    };

    const downloadCertificate = () => {
        if (certificateData) {
            const link = document.createElement('a');
            link.href = certificateData.certificateUrl;
            link.download = `magicblock-certificate-${username}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const shareCertificate = () => {
        if (certificateData && navigator.share) {
            navigator.share({
                title: `MagicBlock Certificate - ${username}`,
                text: `I scored ${score}/10 on the MagicBlock quiz!`,
                url: certificateData.certificateUrl
            });
        } else {
            downloadCertificate();
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setQuizCompleted(false);
        setScore(0);
        setUsername("");
        setAvatar(null);
        setAvatarPreview(null);
        setCertificateGenerated(false);
        setCertificateData(null);
    };

    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="page hub-anim-fade-in">
            <div className="quiz-header">
                <h1>{quizT.title}</h1>
                <p className="quiz-subtitle">{quizT.subtitle}</p>
            </div>

            {!quizCompleted ? (
                <div className="quiz-container">
                    <div className="quiz-progress">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="progress-text">
                            {quizT.question.replace('{current}', currentQuestion + 1).replace('{total}', questions.length)}
                        </div>
                    </div>

                    <div className="quiz-card hub-anim-reveal-up">
                        <div className="question-header">
                            <span className="question-number">Q{currentQuestion + 1}</span>
                            <h2 className="question-text">{currentQ.question}</h2>
                        </div>

                        <div className="options-grid">
                            {currentQ.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-btn ${answers[currentQ.id] === index ? 'selected' : ''}`}
                                    onClick={() => handleAnswer(currentQ.id, index)}
                                >
                                    <span className="option-letter">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="option-text">{option}</span>
                                </button>
                            ))}
                        </div>

                        <div className="quiz-navigation">
                            <button
                                className="quiz-nav-btn prev-btn"
                                onClick={handlePrev}
                                disabled={currentQuestion === 0}
                            >
                                ← {quizT.prevButton}
                            </button>

                            {currentQuestion === questions.length - 1 ? (
                                <button
                                    className="quiz-nav-btn submit-btn"
                                    onClick={handleSubmit}
                                    disabled={Object.keys(answers).length !== questions.length}
                                >
                                    {quizT.submitButton}
                                </button>
                            ) : (
                                <button
                                    className="quiz-nav-btn next-btn"
                                    onClick={handleNext}
                                    disabled={answers[currentQ.id] === undefined}
                                >
                                    {quizT.nextButton} →
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="quiz-rules">
                        <h3>📝 {quizT.rules}</h3>
                        <p>{quizT.rulesContent}</p>
                    </div>
                </div>
            ) : score >= 8 ? (
                <div className="quiz-result">
                    {!certificateGenerated ? (
                        <div className="certificate-form hub-anim-reveal-up">
                            <div className="result-header success">
                                <h2>{quizT.certificateTitle}</h2>
                                <p className="result-subtitle">{quizT.certificateSubtitle}</p>
                                <div className="score-badge">
                                    {quizT.score.replace('{score}', score)}
                                </div>
                            </div>

                            <div className="form-content">
                                <div className="form-group">
                                    <label htmlFor="username">{quizT.enterUsername}</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="@yourname"
                                        className="username-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="avatar">{quizT.uploadAvatar}</label>
                                    <div className="avatar-upload">
                                        <label className="upload-btn">
                                            {quizT.uploadButton}
                                            <input
                                                type="file"
                                                id="avatar"
                                                accept="image/*"
                                                onChange={handleAvatarUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                        {avatarPreview && (
                                            <div className="avatar-preview">
                                                <img src={avatarPreview} alt="Preview" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    className="generate-cert-btn"
                                    onClick={generateCertificate}
                                    disabled={!username.trim()}
                                >
                                    🎨 {quizT.generating}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="certificate-display hub-anim-reveal-up">
                            <div className="result-header success">
                                <h2>{quizT.certificateTitle}</h2>
                                <p className="result-subtitle">{quizT.certificateSubtitle}</p>
                                <div className="score-badge">
                                    {quizT.score.replace('{score}', score)}
                                </div>
                            </div>

                            <div className="certificate-preview">
                                <img src={certificateData.certificateUrl} alt="Certificate" className="certificate-image" />
                            </div>

                            <div className="certificate-actions">
                                <button className="certificate-btn download-btn" onClick={downloadCertificate}>
                                    📥 {quizT.downloadButton}
                                </button>
                                <button className="certificate-btn share-btn" onClick={shareCertificate}>
                                    🔗 {quizT.shareButton}
                                </button>
                                <button className="certificate-btn retry-btn" onClick={resetQuiz}>
                                    🔄 {quizT.retryButton}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="quiz-result">
                    <div className="result-header failure">
                        <h2>{quizT.noCertificateTitle}</h2>
                        <p className="result-subtitle">{quizT.noCertificateSubtitle}</p>
                        <div className="score-badge">
                            {quizT.score.replace('{score}', score)}
                        </div>
                    </div>

                    <div className="retry-section">
                        <p>Нужно правильно ответить на 8 или больше вопросов. Попробуй еще раз!</p>
                        <button className="retry-btn" onClick={resetQuiz}>
                            🔄 {quizT.retryButton}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const PodiumCard = ({ player, getRankIcon, getScoreBadge, hallOfFame }) => {
    const isRussian = hallOfFame.title === "Зал Славы MagicBlock Quiz";

    return (
        <div className={`podium-card rank-${player.rank} ${player.isPlaceholder ? 'placeholder' : ''}`}>
            <div className="podium-rank">
                <span className="rank-icon-large">{getRankIcon(player.rank)}</span>
            </div>

            <div className="podium-avatar-container">
                <img
                    src={player.avatar}
                    alt={player.username}
                    className="podium-avatar"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzJBMkEyQSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjNEM0QzRDIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI3MCIgcj0iMjAiIGZpbGw9IiM0QzRDNEMiLz48dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI0ZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPj88L3RleHQ+PC9zdmc+";
                    }}
                />
                {player.isPlaceholder && (
                    <div className="placeholder-overlay">
                        <span className="overlay-text">{isRussian ? "Свободно" : "Available"}</span>
                    </div>
                )}
            </div>

            <div className="podium-info">
                <h3 className={`podium-username ${player.isPlaceholder ? 'placeholder' : ''}`}>
                    {player.isPlaceholder ? (isRussian ? "Место свободно!" : "Spot Available!") : player.username}
                </h3>
                <div className="podium-score">
                    {getScoreBadge(player.score, player.isPlaceholder)}
                </div>
                <div className="podium-meta">
                    <span className="meta-item">📅 {player.date}</span>
                    <span className="meta-item">⏰ {player.time}</span>
                </div>
            </div>

            <button className="podium-action-btn disabled" disabled={player.isPlaceholder}>
                {player.isPlaceholder ? (isRussian ? "Ожидаем участника" : "Waiting for participant") : hallOfFame.viewTwitter}
            </button>

            {player.isPlaceholder && (
                <div className="placeholder-hint">
                    <span className="hint-icon">👆</span>
                    <span className="hint-text">{isRussian ? "Может быть вашим!" : "Could be yours!"}</span>
                </div>
            )}
        </div>
    );
};

// Выносим CategorySection за пределы HallOfFamePage
const CategorySection = ({ title, players, icon, hallOfFame, getRankIcon, getScoreBadge, placesCount }) => {
    const isRussian = hallOfFame.title === "Зал Славы MagicBlock Quiz";
    const topThree = players.slice(0, 3);
    const emptyPlaces = placesCount - players.filter(p => !p.isPlaceholder).length;

    return (
        <div className="hof-category-section hub-anim-reveal-up">
            <h2 className="category-title">
                <span className="category-icon">{icon}</span>
                {title}
                {emptyPlaces > 0 && (
                    <span className="places-badge">{emptyPlaces} {isRussian ? "свободных мест" : "spots available"}</span>
                )}
            </h2>

            <div className="category-description">
                <p>
                    {players.filter(p => !p.isPlaceholder).length === 0
                        ? (isRussian
                            ? "🎯 Здесь будут первые 3 участника, получивших этот результат. Места ждут своих героев!"
                            : "🎯 Here will be the first 3 participants who achieved this result. Spots are waiting for their heroes!")
                        : (isRussian
                            ? "🏅 Топ-3 участников с лучшим результатом в этой категории"
                            : "🏅 Top 3 participants with the best results in this category")
                    }
                </p>
            </div>

            {/* Пьедестал для топ-3 */}
            <div className="category-podium">
                {topThree.map((player) => (
                    <div key={player.id} className={`category-podium-card rank-${player.rank} ${player.isPlaceholder ? 'placeholder' : ''}`}>
                        <div className="podium-rank-small">
                            <span className="rank-icon-small">{getRankIcon(player.rank)}</span>
                        </div>
                        <div className="podium-avatar-small">
                            <img
                                src={player.avatar}
                                alt={player.username}
                                className="avatar-small"
                            />
                            {player.isPlaceholder && (
                                <div className="placeholder-indicator">?</div>
                            )}
                        </div>
                        <div className="podium-info-small">
                            <h4 className={player.isPlaceholder ? 'placeholder' : ''}>
                                {player.isPlaceholder ? (isRussian ? "Свободно" : "Available") : player.username}
                            </h4>
                            <div className="score-small">
                                {getScoreBadge(player.score, player.isPlaceholder)}
                            </div>
                            <div className="meta-small">
                                <span>📅 {player.date}</span>
                                <span>⏰ {player.time}</span>
                            </div>
                        </div>
                        <button
                            className="action-btn-small disabled"
                            disabled={player.isPlaceholder}
                            title={player.isPlaceholder ? (isRussian ? "Место свободно" : "Spot available") : hallOfFame.viewTwitter}
                        >
                            {player.isPlaceholder ? "?" : "👁️"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Сообщение для свободных мест */}
            {players.filter(p => !p.isPlaceholder).length === 0 && (
                <div className="empty-category-message">
                    <div className="empty-icon">🎯</div>
                    <h3>{isRussian ? "Эта категория пока пуста" : "This category is empty for now"}</h3>
                    <p>{isRussian
                        ? `Станьте первым, кто получит ${title.toLowerCase()} и займет почетное место на пьедестале!`
                        : `Become the first to achieve ${title.toLowerCase()} and take a place on the podium!`
                    }</p>
                </div>
            )}
        </div>
    );
};
const ValentineCreatorPage = () => {
    return (
        <div className="hub-content-wrapper">
            <CharacterCreator />
        </div>
    );
};
const HallOfFamePage = ({ t }) => {
    return <HallOfFame />;
};

export default function App() {
    const [currentLang, setCurrentLang] = useState(null);
    const [languageSelected, setLanguageSelected] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('magicblock_lang');
        if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
            setTimeout(() => {
                setCurrentLang(savedLang);
                setLanguageSelected(true);
            }, 0);
        }
    }, []);

    const t = currentLang ? translations[currentLang] : translations.ru;

    if (!languageSelected) {
        return <LanguageSelector onLanguageSelect={(lang) => {
            setCurrentLang(lang);
            setLanguageSelected(true);
        }} />;
    }

    return (
        <div className="hub-mode">
            <HubApp
                t={t}
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
            />
        </div>
    );
}
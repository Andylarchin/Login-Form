import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          login: 'Log in',
          username: 'Username',
          password: 'Password',
          register: 'Register',
          lgin: 'LOG IN',
          update: 'UPDATE USER',
          warning: 'This field is required',
          subwarning: 'Something went wrong!',
          errpop: 'Ooops...',
          gudpop: 'Good job!',
          subgud: 'You succesfully logged in your account!',
        },
      },
      fr: {
        translation: {
          login: 'Log in',
          username: 'Nom dutilisateur',
          password: 'Mot de passe',
          register: "S'inscrire",
          lgin: 'LOG IN',
          update: "Mettre à jour l'utilisateur",
          warning: 'Ce champ est requis',
          subwarning: "Quelque chose s'est mal passé!",
          errpop: 'Ooops...',
          gudpop: 'Bon travail!',
          subgud: 'Vous êtes connecté à votre compte!',
        },
      },

      de: {
        translation: {
          login: 'Log in',
          username: 'Nutzername',
          password: 'Passwort',
          register: 'Registrieren',
          lgin: 'LOG IN',
          update: 'Benutzer aktualisieren',
          warning: 'Dieses Feld ist erforderlich',
          subwarning: 'Etwas ist schief gelaufen!',
          errpop: 'Ooops...',
          gudpop: 'Gute Arbeit!',
          subgud: 'Sie sind in Ihrem Konto angemeldet!',
        },
      },

      ch: {
        translation: {
          login: 'Log in',
          username: 'ユーザー名',
          password: 'パスワード',
          register: '登録',
          lgin: 'LOG IN',
          update: 'ユーザーの更新',
          warning: 'この項目は必須です',
          subwarning: 'エラーが発生しました。',
          errpop: 'Ooops...',
          gudpop: 'よくできました！',
          subgud: 'アカウントにログインしました！',
        },
      },

      ru: {
        translation: {
          login: 'Log in',
          username: 'Имя пользователя',
          password: 'Пароль',
          register: 'Pегистр',
          lgin: 'LOG IN',
          update: 'Обновить пользователя',
          warning: 'Это поле обязательно к заполнению',
          subwarning: 'Что-то пошло не так!',
          errpop: 'Ooops...',
          gudpop: 'Хорошая работа!',
          subgud: 'Вы вошли в свой аккаунт!',
        },
      },
    },
  });

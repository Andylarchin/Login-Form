import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(ChainedBackend)
  .init({
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend((lng, ns, clb) => {
          import(`./locales/${lng}/translation.json`)
            .then((resources) => clb(null, resources))
            .catch(clb);
        }),
      ],
      backendOptions: [
        {
          loadPath: '/locales/{{lng}}/translation.json',
        },
      ],
    },
  });

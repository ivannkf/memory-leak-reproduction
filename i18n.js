import { createI18n as _createI18n } from 'vue-i18n'

export const locales = ['en', 'es', 'ca', 'de']

export const createI18n = () => {
  return _createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {

    }
  })
}

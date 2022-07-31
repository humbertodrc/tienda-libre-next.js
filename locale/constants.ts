const EN_US = "en-US";
const ES_ES = "es-ES";
const PT_BR = "pt-BR";

export const defaultLocale = ES_ES;
export const locales = {
  EN_US,
  ES_ES,
  PT_BR,
};

export const localeNames = {
  [EN_US]: "English",
  [ES_ES]: "Español",
  [PT_BR]: "Português",
};

export const TEXTS_BY_LANGUAGE = {
  [EN_US]: {
    HEADER: {
      TYCS: "Terms and conditions",
      PRODUCTS: "Featured Products",
      DISCOUNTS: "Discounts",
      CONTACT: "Contact",
    },
    MAIN: {
      PRODUCTS: "Featured Products",
      TYCS: "Terms and conditions",
    },
    DISCOUNTS: {
      TITLE: "Discounts",
      EXPIRATION: "Expires",
    },
    CONTACT: {
      TITLE: "Ask us a question",
      FIELDS: {
        NAME: "Name",
        EMAIL: "Email",
        COUNTRY: "Country",
        GENDER: "Gender",
        MALE: "Male",
        FEMALE: "Female",
        OTHER: "Other",
        QUESTION: "Write your question here",
        TYCS: "I accept the terms and conditions",
      },
      SEND_BUTTON: "SEND",
    },
  },
  [ES_ES]: {
    HEADER: {
      TYCS: "Términos y condiciones",
      PRODUCTS: "Productos destacados",
      DISCOUNTS: "Descuentos",
      CONTACT: "Contacto",
    },
    MAIN: {
      PRODUCTS: "Productos destacados",
      TYCS: "Términos y condiciones",
    },
    DISCOUNTS: {
      TITLE: "Descuentos",
      EXPIRATION: "Validez",
    },
    CONTACT: {
      TITLE: "Evianos tu consulta",
      FIELDS: {
        NAME: "Nombre",
        EMAIL: "Email",
        COUNTRY: "País",
        GENDER: "Género",
        MALE: "Masculino",
        FEMALE: "Femenino",
        OTHER: "Otro",
        QUESTION: "Ingresa tu consulta",
        TYCS: "Acepto los términos y condiciones",
      },
      SEND_BUTTON: "ENVIAR CONSULTA",
    },
  },
  [PT_BR]: {
    HEADER: {
      TYCS: "Termos e Condições",
      PRODUCTS: "Produtos em destaque",
      DISCOUNTS: "Descontos",
      CONTACT: "Contato",
    },
    MAIN: {
      PRODUCTS: "Produtos em destaque",
      TYCS: "Termos e Condições",
    },
    DISCOUNTS: {
      TITLE: "Descontos",
      EXPIRATION: "Expiração",
    },
    CONTACT: {
      TITLE: "Envie-nos a sua consulta",
      FIELDS: {
        NAME: "Nome",
        EMAIL: "E-mail",
        COUNTRY: "País",
        GENDER: "Gênero",
        MALE: "Masculino",
        FEMALE: "Feminino",
        OTHER: "Outro",
        QUESTION: "Digite sua consulta",
        TYCS: "Aceito os termos e condições",
      },
      SEND_BUTTON: "ENVIAR CONSULTA",
    },
  },
};

/* global Handlebars */
export const select = {
  templateOf: {
    linkTable: `#template-link-table`,
    bannerTable: `#template-banner-table`,
    detailsTable: `#template-details-table`,
    personalData: `#template-personal-data`,
  },
  containerOf: {
    pages: `#pages`,
    linkTable: `#linkTable`,
    bannerTable: `#bannerTable`,
    detailsTable: `#detailsTable`,
    personalData: `#personalData`,
  },
  nav:{
    links: `.menu__link`,
  }
};

export const classNames = {
  btn: {
    buttonAdd: `btn--add`,
  },
  nav: {
    active: `active`,
  },
  pages: {
    active: `active`,
  },
};

export const settings = {
  db: {
    url: `//` + window.location.hostname + (window.location.hostname==`localhost` ? `:3131` : ``),
    linkTable:`linkTable`,
    bannerTable: `bannerTable`,
    detailsTable: `detailsTable`,
    personalData: `personalData`,
  }
};

export const templates = {
  linkTable: Handlebars.compile(document.querySelector(select.templateOf.linkTable).innerHTML),
  bannerTable: Handlebars.compile(document.querySelector(select.templateOf.bannerTable).innerHTML),
  detailsTable: Handlebars.compile(document.querySelector(select.templateOf.detailsTable).innerHTML),
  personalData: Handlebars.compile(document.querySelector(select.templateOf.personalData).innerHTML),
};
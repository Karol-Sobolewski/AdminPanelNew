/* global Handlebars */
export const select = {
    templateOf: {
      linkTable: '#template-link-table',
      },
      containerOf: {
        pages: '#pages',
        linkTable: '#linkTable',
      },
      nav:{
          links: '.menu__link',
      }
};

export const classNames = {
    btn: {
      buttonAdd: 'btn--add',
    },
    nav: {
      active: 'active',
    },
    pages: {
      active: 'active',
    },
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    linkTable:'linkTable',
  }
};

export const templates = {
    linkTable: Handlebars.compile(document.querySelector(select.templateOf.linkTable).innerHTML),
    
};
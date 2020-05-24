/* global Handlebars */
export const select = {
    templateOf: {
        menuProduct: '#template-menu-product',
        cartProduct: '#template-cart-product',
        bookingWidget: '#template-booking-widget',
      },
      containerOf: {
        pages: '#pages',
      },
      nav:{
          links: '.menu__link',
      }
};

export const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
    cart: {
      wrapperActive: 'active',
    },
    // CODE ADDED START
    booking: {
      loading: 'loading',
      tableBooked: 'booked',
      tableSelected: 'selected',
      //tableBookedSvr: 'bookedSvr',
    },
    nav: {
      active: 'active',
    },
    pages: {
      active: 'active',
    },
};
/*export const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
    cartProduct: Handlebars.compile(document.querySelector(select.templateOf.cartProduct).innerHTML),
    bookingWidget: Handlebars.compile(document.querySelector(select.templateOf.bookingWidget).innerHTML), // CODE ADDED
  };*/
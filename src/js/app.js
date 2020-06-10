import { settings, select, classNames } from './settings.js';
import Link from './components/Links.js';
import Banner from './components/Banners.js';
//import Details from './components/Details.js';
import PersonalData from './components/Personal-Data.js';
import Table from './components/Table.js';

const app = {

  getData() {
    const thisApp = this;
    thisApp.data = {};
    const urls = {
      linkTable: settings.db.url + `/` + settings.db.linkTable,
      bannerTable: settings.db.url + `/` + settings.db.bannerTable,
      detailsTable: settings.db.url + `/` + settings.db.detailsTable,
      personalData: settings.db.url + `/` + settings.db.personalData,
      
    };
    Promise.all([fetch(urls.linkTable), fetch(urls.bannerTable), fetch(urls.detailsTable), fetch(urls.personalData)])
      .then(function (allResponses) {
        const linksResponse = allResponses[0];
        const bannersResponse = allResponses[1];
        const detailsResponse = allResponses[2];
        const personaldataResponse = allResponses[3];
        return Promise.all([linksResponse.json(), bannersResponse.json(), detailsResponse.json(), personaldataResponse.json()]);
      })
      .then(function ([linkTable, bannerTable, detailsTable, personalData]) {
        thisApp.data.linkTable = linkTable;
        thisApp.data.bannerTable = bannerTable;
        thisApp.data.detailsTable = detailsTable;
        thisApp.data.personalData = personalData;        
        
        thisApp.initTables();
        thisApp.initpersonalDataForm();
      });
  },

  initPages() {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace(`#/`, ``);
    let pageMatchingHash = thisApp.pages[0].id;

    for (const page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (const link of thisApp.navLinks) {
      link.addEventListener(`click`, function (event) {
        const clickedElement = this;
        const sidebar = document.querySelector(`.nav__container`);
        event.preventDefault();

        /* get page id from href atribute */
        const id = clickedElement.getAttribute(`href`).replace(`#`, ``);

        /* run thisApp.acivatePage with that id */
        thisApp.activatePage(id);

        /* change url hash */
        window.location.hash = `#/` + id;

        sidebar.classList.remove(`toggle`);
      });
    }
  },

  activatePage(pageId) {
    const thisApp = this;

    /* add class 'active' to matching pages, remove from non-matchig */
    for (const page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class 'active' to matching links, remove from non-matchig */
    for (const link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute(`href`) == `#` + pageId
      );
    }
  },

  toggleSideBar() {
    const hamburger = document.querySelector(`.hamburger`);
    const sidebar = document.querySelector(`.nav__container`);

    hamburger.addEventListener(`click`, function () {
      sidebar.classList.toggle(`toggle`);
    });
  },

  initTables(){
    const thisApp = this;
    const values = Object.values(thisApp.data);
    values.splice(-1, 1);
    new Table(values);
  },

  initAddLink(){
    const thisApp = this;
    new Link(thisApp.data);
  },

  initAddBanner() {
    const thisApp = this;
    new Banner(thisApp.data);
  },

  initpersonalDataForm() {
    const thisApp = this;
    for (const personalData in thisApp.data.personalData) {
      new PersonalData(thisApp.data.personalData[personalData]);
    }
  },

  initModal() {
    function closeModal() {
      document.getElementById(`overlay`).classList.remove(`show`);
    }

    document
      .querySelectorAll(`#overlay .js--close-modal`)
      .forEach(function (btn) {
        btn.addEventListener(`click`, function (e) {
          e.preventDefault();
          closeModal();
        });
      });

    document.querySelector(`#overlay`).addEventListener(`click`, function (event) {
      if (event.target === this) {
        closeModal();
      }
    });

    document.addEventListener(`keyup`, function (event) {
      if (event.keyCode === 27) {
        closeModal();
      }
    });
  },

  initChart() {
    const ctx = document.getElementById(`myChart`).getContext(`2d`);
    /*eslint-disable*/
    const chart = new Chart(ctx, {
      // 1
      type: `bar`,
      data: {
        // 2
        labels: [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`, `09`, `10`],
        // 3
        datasets: [{
          // 4
          label: `Signups`,
          // 5
          backgroundColor: `#8DBEC8`,
          borderColor: `#8DBEC8`,
          // 6
          data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
        },
        {
          label: `FTD`,
          backgroundColor: `#F29E4E`,
          borderColor: `#F29E4E`,
          data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
        },
        {
          label: `Earned`,
          backgroundColor: `#71B374`,
          borderColor: `#71B374`,
          data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],
          // 7
          hidden: true,
        }]
      },
    });
  },

  init: function () {
    const thisApp = this;
    thisApp.initPages();
    thisApp.toggleSideBar();
    thisApp.getData();
    thisApp.initModal();
    thisApp.initChart();
    thisApp.initAddLink();
    thisApp.initAddBanner();
  },
};

app.init();

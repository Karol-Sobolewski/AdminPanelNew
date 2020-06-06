import {templates, select } from '../settings.js';
import utils from '../utils.js';

class Banners {
  constructor(data) {
    const thisBanners = this;

    thisBanners.data = data;
    //thisLinks.renderLinkTable();
    thisBanners.renderdetailsTable();
  }

  renderdetailsTable() {
    const thisBanners = this;
    const generateHTML = templates.bannerTable(thisBanners.data);

    thisBanners.banners = utils.createDOMFromHTML(generateHTML, `tr`);

    const bannerContainer = document.querySelector(
      select.containerOf.bannerTable
    );

    bannerContainer.appendChild(thisBanners.banners);
  }
}

export default Banners;

import {templates, select } from '../settings.js';
import utils from '../utils.js';

class Details {
  constructor(data) {
    const thisDetails = this;
  
    thisDetails.data = data;
    thisDetails.renderDetailsable();
  }
  renderDetailsable() {
    const thisDetails = this;
    const generateHTML = templates.detailsTable(thisDetails.data);

    thisDetails.details = utils.createDOMFromHTML(generateHTML, `tr`);
    //console.log(detailsContainer);
    
    const detailsContainer = document.querySelector(select.containerOf.detailsTable);
  
    detailsContainer.appendChild(thisDetails.details);
  }
}

export default Details;
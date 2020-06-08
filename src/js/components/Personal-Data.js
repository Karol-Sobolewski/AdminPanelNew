import {templates, select } from '../settings.js';
import utils from '../utils.js';

class PersonalData {
  constructor(data) {
    const thisPersonalData = this;
  
    thisPersonalData.data = data;
    thisPersonalData.renderPersonalDataForm();
  }

  renderPersonalDataForm() {
    const thisPersonalData = this;
    const generateHTML = templates.personalData(thisPersonalData.data);

    thisPersonalData.personalData = utils.createDOMFromHTML(generateHTML, `div`, `form__wrapper--personal-data`);

    const bannerContainer = document.querySelector(
      select.containerOf.personalData
    );

    bannerContainer.appendChild(thisPersonalData.personalData);
  }

}
export default PersonalData;
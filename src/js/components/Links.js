import {templates, select } from '../settings.js';
import utils from '../utils.js';

class Links {
  constructor(data) {
    const thisLinks = this;

    thisLinks.data = data;
    thisLinks.renderLinkTable();
    thisLinks.toggleLinkModal();
    thisLinks.getElements();
  }

  getElements() {
    const thisLinks = this;
    const data = thisLinks.dom = {};
    thisLinks.form = document.querySelector(`.form__addLink`);
    thisLinks.formInputs = thisLinks.form.querySelectorAll(`input, select`);

    // console.log(`form inputs`, thisLinks.formInputs);
    for (const input in thisLinks.formInputs) {
      //input.addEventListener(`change`, function(){
      //console.log(`click`, input);
      //});
    }
    const formData = utils.serializeFormToObject(thisLinks.dom.form);
    // console.log(`form data`, formData);
    thisLinks.generateLink(data);
  }

  generateLink(data) {
    //const input = data.form.getElementsByName(`scheme-name`);
    //console.log(`data`, data);
  
    //console.log('links', thisLinks.formInputs);
  }

  renderLinkTable() {
    const thisLinks = this;
    const generateHTML = templates.linkTable(thisLinks.data);

    thisLinks.links = utils.createDOMFromHTML(generateHTML, `tr`);

    const linkContainers = document.querySelectorAll(
      select.containerOf.linkTable
    );
    for (const container of linkContainers) {
      container.appendChild(thisLinks.links.cloneNode(true));
    }
  }

  openModal(modal) {
    document.querySelectorAll(`#overlay > *`).forEach(function (modal) {
      modal.classList.remove(`show`);
    });
    document.querySelector(`#overlay`).classList.add(`show`);
    document.querySelector(modal).classList.add(`show`);
  }

  toggleLinkModal() {
    const thisLinks = this;
    // console.log(`links`, this);
    const addlinks = document.querySelectorAll(`.btn__add--links`);
    addlinks.forEach((element) =>
      element.addEventListener(`click`, function () {
        thisLinks.openModal(`#linkModal`);
      })
    );
    /*for(const addlink of addlinks){
            console.log('xd', addlink)  
            addlink.addEventListener('click', function(){
                console.log('click')
                //form.classList.toggle('display');
            })
           
          }*/
  }
}
export default Links;

//import {templates, select } from '../settings.js';
//import utils from '../utils.js';
import Modal from './Modals.js';

class Link {
  constructor(data) {
    const thisLinks = this;

    thisLinks.data = data;
    //thisLinks.renderLinkTable();
    thisLinks.toggleAddLinkModal();
    thisLinks.getElements();
  }

  getElements() {
    const thisLinks = this;
    thisLinks.dom = {};
    thisLinks.form = document.querySelector(`.form__addLink`);
    thisLinks.formInputs = thisLinks.form.querySelectorAll(`input, select`);
  }


  /*renderLinkTable() {
    const thisLinks = this;
    const generateHTML = templates.linkTable(thisLinks.data);

    thisLinks.links = utils.createDOMFromHTML(generateHTML, `tr`);

    const linkContainers = document.querySelectorAll(
      select.containerOf.linkTable
    );
    for (const container of linkContainers) {
      container.appendChild(thisLinks.links.cloneNode(true));
    }
  }*/

  toggleAddLinkModal() {
    //const thisLinks = this;
    
    const addLink = document.querySelectorAll(`.btn__add--link`);
    addLink.forEach((element) =>
      element.addEventListener(`click`, function () {
        //thisLinks.openModal(`#linkModal`);
        console.log(`click link`);
        
        new Modal(`#linkModal`);
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
export default Link;

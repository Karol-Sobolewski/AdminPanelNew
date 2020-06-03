import { classNames, templates, select } from "../settings.js";
import utils from "../utils.js";

class Links{
    constructor(data){
        const thisLinks = this;
        
        thisLinks.data = data   
        thisLinks.renderLinkTable();   
        thisLinks.toggleLink() 
    }

    renderLinkTable(){
        const thisLinks = this;
        const generateHTML = templates.linkTable(thisLinks.data);

        thisLinks.links = utils.createDOMFromHTML(generateHTML, 'tr');
    
        const linkContainers = document.querySelectorAll(select.containerOf.linkTable);
        for(let container of linkContainers) {
            container.appendChild(thisLinks.links.cloneNode(true));
        }
    }
    openModal(modal) {
        document.querySelectorAll('#overlay > *').forEach(function(modal) {
          modal.classList.remove('show')
        })
        document.querySelector('#overlay').classList.add('show')
        document.querySelector(modal).classList.add('show')
      }

    toggleLink(){
        const thisLinks = this;
        const addlinks = document.querySelectorAll('.btn__add--links');
        const form = document.querySelector('.add-links');
        
        //console.log(addlinks)
        addlinks.forEach(element => element.addEventListener('click', function(){
            thisLinks.openModal('#linkModal');
        }));
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
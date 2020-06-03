import { classNames, templates, select } from "../settings.js";
import utils from "../utils.js";

class Banners{
    constructor(data){
        const thisBanners = this;
        
        thisBanners.data = data   
        //thisLinks.renderLinkTable();    
        thisBanners.renderbannerTable()
        thisBanners.toggleLink()
    }

    renderbannerTable(){
        const thisBanners = this;
        const generateHTML = templates.bannerTable(thisBanners.data);

        thisBanners.banners = utils.createDOMFromHTML(generateHTML, 'tr');
    
        const bannerContainer = document.querySelector(select.containerOf.bannerTable);
    
        bannerContainer.appendChild(thisBanners.banners);
    }

    openModal(modal) {
        document.querySelectorAll('#overlay > *').forEach(function(modal) {
          modal.classList.remove('show')
        })
        document.querySelector('#overlay').classList.add('show')
        document.querySelector(modal).classList.add('show')
      }

    toggleLink(){
        const thisBanners = this;
        const addlinks = document.querySelectorAll('.btn__add--links');
        const form = document.querySelector('.add-links');
        
        //console.log(addlinks)
        addlinks.forEach(element => element.addEventListener('click', function(){
            thisBanners.openModal('#myModal');
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


export default Banners
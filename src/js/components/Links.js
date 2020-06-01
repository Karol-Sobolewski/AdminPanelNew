import { classNames, templates, select } from "../settings.js";
import utils from "../utils.js";

class Links{
    constructor(data){
        const thisLinks = this;
        
        thisLinks.data = data   
        thisLinks.renderLinkTable();    
    }

    renderLinkTable(){
        const thisLinks = this;
        const generateHTML = templates.linkTable(thisLinks.data);

        thisLinks.links = utils.createDOMFromHTML(generateHTML);
    
        const linkContainer = document.querySelector(select.containerOf.linkTable);
    
        linkContainer.appendChild(thisLinks.links);


    }
}
export default Links;
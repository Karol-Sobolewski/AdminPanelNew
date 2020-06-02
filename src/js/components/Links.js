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

        thisLinks.links = utils.createDOMFromHTML(generateHTML, 'tr');
    
        const linkContainers = document.querySelectorAll(select.containerOf.linkTable);
        for(let container of linkContainers) {
            container.appendChild(thisLinks.links.cloneNode(true));
        }

    }
}
export default Links;
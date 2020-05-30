
import {select, classNames, templates, settings} from "./settings.js";
import utils from "./utils.js";


  const app = {
    initPages: function(){
        const thisApp = this;
    
        thisApp.pages = document.querySelector(select.containerOf.pages).children;
        thisApp.navLinks = document.querySelectorAll(select.nav.links);

        const idFromHash = window.location.hash.replace('#/', '');
        let pageMatchingHash = thisApp.pages[0].id;

        for(let page of thisApp.pages){
            if(page.id == idFromHash){
              pageMatchingHash = page.id;
              break;
            }
          }

          thisApp.activatePage(pageMatchingHash);

          for(let link of thisApp.navLinks){
            link.addEventListener('click', function(event){
              const clickedElement = this;
              const sidebar = document.querySelector('.nav__container');
              event.preventDefault();
      
              /* get page id from href atribute */
              const id = clickedElement.getAttribute('href').replace('#', '');
      
              /* run thisApp.acivatePage with that id */
              thisApp.activatePage(id);
      
              /* change url hash */
              window.location.hash = '#/' + id;
              
              sidebar.classList.remove('toggle');
            });
          }
    },
      
    activatePage: function(pageId){
      const thisApp = this;
      
      /* add class 'active' to matching pages, remove from non-matchig */
      for(let page of thisApp.pages){
        page.classList.toggle(classNames.pages.active, page.id == pageId);
      }
      
          /* add class 'active' to matching links, remove from non-matchig */
      for(let link of thisApp.navLinks){
        link.classList.toggle(
          classNames.nav.active,
          link.getAttribute('href') == '#' + pageId
        );
          }
    },

    toggleSideBar: function (){
      const hamburger = document.querySelector('.hamburger');
      const sidebar = document.querySelector('.nav__container');

        hamburger.addEventListener('click', function(){
            sidebar.classList.toggle('toggle');
        })
    },

    toggleLink: function (){
      const addlink = document.querySelector('.btn--add');
      const form = document.querySelector('.add-links');

        addlink.addEventListener('click', function(){
            console.log('add');
            form.classList.toggle('display');
        })
    },

    initLinkTable(){
      //console.log("hey");
      const thisApp = this;
      for(let linkData in thisApp.data.linkTable){

        const link = thisApp.data.linkTable[linkData];
        const generateHTML = templates.linkTable(link);

        thisApp.linkTable = utils.createDOMFromHTML(generateHTML);

        const linkTableContainer = document.querySelector(select.containerOf.linkTable);

        linkTableContainer.appendChild(thisApp.linkTable);
      }    
    },

    getData(){
      const thisApp = this;
      thisApp.data = {};
      const urls = {
        linkTable: settings.db.url + '/' + settings.db.linkTable,
      };
      fetch(urls.linkTable)
        .then(rawResponse => rawResponse.json())
        .then(parsedResponse => {
          thisApp.data.linkTable = parsedResponse;
          thisApp.initLinkTable();
          console.log(parsedResponse)
        });
      //console.log(urls)
    },

    init: function(){
        const thisApp = this;
        thisApp.initPages();
        thisApp.toggleSideBar();
     //   thisApp.toggleLink();
        thisApp.getData();
    },
  };
  
  app.init();

import {select, classNames} from "./settings.js";


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
              event.preventDefault();
      
              /* get page id from href atribute */
              const id = clickedElement.getAttribute('href').replace('#', '');
      
              /* run thisApp.acivatePage with that id */
              thisApp.activatePage(id);
      
              /* change url hash */
              window.location.hash = '#/' + id;
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
    initSideBar: function (){
        const hamburger = document.querySelector('.hamburger');
        const sidebar = document.querySelector('.nav__container');

        hamburger.addEventListener('click', function(){
            sidebar.classList.toggle('toggle');
        })
    },

    init: function(){
        const thisApp = this;
        thisApp.initPages();
        thisApp.initSideBar();
    },
  };
  
  app.init();
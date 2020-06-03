import {settings, select, classNames} from './settings.js';
import utils from "./utils.js";
import Links from './components/Links.js';
import Banners from './components/Banners.js';

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

    initLinkTable(){
      //console.log("hey");
      const thisApp = this;
      for(let linkData in thisApp.data.linkTable){

        new Links(thisApp.data.linkTable[linkData]);
      }    
      const thead =  document.querySelector('thead')
      
      thead.addEventListener('click', function(){
        if(event.target.tagName === 'TH'){
          const dataset = event.target.dataset;
          thisApp.sortTable(dataset);
          
          console.log(table)
        }
      })
      /*const th = document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const dataname = th.dataset;
        thisApp.sortTable(dataname)
        
        const table = document.getElementById("detailsTable");
        //console.log(table);
        //table.sort();
        //console.log(dataname);
        
        })));
*/

    },
    
    sortTable(a, b, dataset){
      console.log('data', dataset);
      /*if (a[dataset] < b[dataset])
      return -1
      if (a[dataset] > b[dataset])
      return 1
      return 0*/
    },

    initbannerTable(){
      const thisApp = this;
      for(let bannerData in thisApp.data.bannerTable){

        new Banners(thisApp.data.bannerTable[bannerData]);
      }    
    },

    getData(){
      const thisApp = this;
      thisApp.data = {};
      const urls = {
        linkTable: settings.db.url + '/' + settings.db.linkTable,
        bannerTable: settings.db.url + '/' + settings.db.bannerTable,
      };
      Promise.all([
        fetch(urls.linkTable),
        fetch(urls.bannerTable),
      ])
      .then(function(allResponses){
        const linksResponse = allResponses[0];
        const bannersResponse = allResponses[1];
        return  Promise.all([
          linksResponse.json(),
          bannersResponse.json(),
        ]);
      })
      .then(function([linkTable, bannerTable]){
        thisApp.data.linkTable = linkTable;
        thisApp.data.bannerTable = bannerTable;

        thisApp.initLinkTable();
        thisApp.initbannerTable();
      });
    },

    initModal() {
      function closeModal() {
        document.getElementById('overlay').classList.remove('show')
      }
    
      document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault()
          closeModal()
        })
      })
    
      document.querySelector('#overlay').addEventListener('click', function(e) {
        if(e.target === this) {
          closeModal()
        }
      })
    
      document.addEventListener('keyup', function(e) {
        if(e.keyCode === 27) {
          closeModal()
        }
      })
    },

    openModal(modal) {
      document.querySelectorAll('#overlay > *').forEach(function(modal) {
        modal.classList.remove('show')
      })
      document.querySelector('#overlay').classList.add('show')
      document.querySelector(modal).classList.add('show')
    },

    init: function(){
        const thisApp = this;
        thisApp.initPages();
        thisApp.toggleSideBar();
        thisApp.getData();
        thisApp.initModal();
    },
  };
  
  app.init();
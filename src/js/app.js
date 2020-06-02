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
      
     // const table = document.querySelectorAll('table tbody');
      //console.log(table);
      const th = document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const dataname = th.dataset;
        
        const table = document.getElementById("detailsTable");
        //console.log(table);
        //table.sort();
        //console.log(dataname);
        
        })));
      
      /*function compare(a, b) {
                
       const th = document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
          console.log('click');
          })));
          
        if (a < b)
           return -1
        if (a > b)
           return 1
        return 0

     }
   compare();*/

   const stringArray = new Array("Blue","Humpback","Beluga")
   const numericStringArray = new Array("80","9","700")
   const numberArray = new Array(40,1,5,200)
   const mixedNumericArray = new Array("80","9","700",40,1,5,200)
   
   function compareNumbers(a, b) {
      return a - b
   }
   
   /*console.log("tablicaNapisów: " + stringArray.join())
   console.log("Posortowana: " + stringArray.sort())
   
   console.log("tablicaLiczbowa: " + numberArray.join())
   console.log("Posortowana bez funkcji porównującej: " + numberArray.sort())
   console.log("Posortowana z funkcją porównującą: " + numberArray.sort(compareNumbers))
   
   console.log("tablicaNapisówLiczbowych: " + numericStringArray.join())
   console.log("Posortowana bez funkcji porównującej: " + numericStringArray.sort())
   console.log("Posortowana z funkcją porównującą: " + numericStringArray.sort(compareNumbers))
   
   console.log("tablicaLiczbowaMieszna: " + mixedNumericArray.join())
   console.log("Posortowana bez funkcji porównującej: " + mixedNumericArray.sort())
   console.log("Posortowana z funkcją porównującą: " + mixedNumericArray.sort(compareNumbers))*/

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

    init: function(){
        const thisApp = this;
        thisApp.initPages();
        thisApp.toggleSideBar();
        thisApp.getData();
    },
  };
  
  app.init();
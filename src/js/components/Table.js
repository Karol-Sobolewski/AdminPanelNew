//import {templates, select } from '../settings.js';
//import utils from '../utils.js';
let lastParam = ``;
class Table {
  constructor(data) {
    const thisTable = this;
  
    thisTable.data = data;
    //thisTable.renderPersonalDataForm();
    //console.log(`thisTable.data `, thisTable.data);
    const linkData = thisTable.data[0];
    const bannerData = thisTable.data[1];
    const detailsData = thisTable.data[2];
    //console.log(linkData);
    thisTable.renderLinkTable(linkData);
    thisTable.renderBannerTable(bannerData);
    thisTable.renderDetailsTable(detailsData);
  }

  generateTHEAD(data) {
    let html = ``;
    const refObj = JSON.parse(JSON.stringify(data[0]));
    delete refObj.id;
    for(const param in refObj) {
      html += `<th data-name="${param}">${param}</th>`;
    }
    //console.log(html);
    
    return html;
  }
  
  generateTBODY(data, icons) {
    let html = ``;
    for(const doc of data) {
      html += `<tr>`;
      const values = Object.values(doc);
      values.splice(0, 1);
   
      for(const val of values) {
        html += `<td>${val}</td>`;
      }
      html += `<td>${icons}</td>`;
      html += `</tr>`;   
      //console.log(html);
    }
    
    return html;
  }

  addTableHeadListener(data) {
    const thisTable = this;
    //console.log(data);
    
    const theads = document.querySelectorAll(`table thead`);
    //console.log(thead);
    for(const thead of theads){
      thead.addEventListener(`click`, function(event) {
        event.preventDefault();
        if(event.target.tagName === `TH`) thisTable.sortByParam(data, event.target.getAttribute(`data-name`));
      });
    } 
  }

  sortByParam(data, param) {

    const thisTable = this;
    
    const sortedData = data.sort((a, b) => {
      //console.log(data, param);
    
      //console.log(a[param]);
      if(param === lastParam) {
        if (a[param] < b[param]) return 1;
        if (a[param] > b[param]) return -1;
        console.log(`sort 1`);

      } 
      else {
        console.log(`sort 2`);
        
        if (a[param] > b[param]) return 1;
        if (a[param] < b[param]) return -1;
      }
     
      return 0;
    });
      
    lastParam = param;
    thisTable.renderDetailsTable(sortedData);
  }

  renderLinkTable(data) {
    const thisTable = this;
    const linkTables = document.querySelectorAll(`.linkTable`);
    const icons = `<div class="table__icons"><i class="icon--link icon-links"></i><i class="icon--link icon-trash"></i></div>`;
    //const thead = thisTable.generateTHEAD(data);
    //table.querySelector(`thead`).innerHTML = thead;
    const tbody = thisTable.generateTBODY(data, icons);
    for (const linkTable of linkTables) {
      //console.log(`container`, linkTable);
      linkTable.querySelector(`tbody`).innerHTML = tbody;
    }
    
    
    //thisTable.addTableHeadListener(data);
  }

  renderBannerTable(data) {
    const thisTable = this;
    const table = document.querySelector(`.bannerTable`);
    const icons = `<div class="table__icons"><i class="icon--link icon-links"></i><i class="icon--link icon-trash"></i></div>`;
    const tbody = thisTable.generateTBODY(data, icons);
    table.querySelector(`tbody`).innerHTML = tbody;
  }

  renderDetailsTable(data){
    const thisTable = this;
    const table = document.querySelector(`.detailsTable`);
    //const icons = `<div class="table__icons"><i class="icon--link icon-links"></i><i class="icon--link icon-trash"></i></div>`;
    const thead = thisTable.generateTHEAD(data);
    const tbody = thisTable.generateTBODY(data, ``);
    table.querySelector(`thead`).innerHTML = thead;
    table.querySelector(`tbody`).innerHTML = tbody;

    thisTable.addTableHeadListener(data);
  }
  
}

export default Table;
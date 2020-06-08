/* global Handlebars, dataSource */

const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString, tag = `div`, className) {
  const elem = document.createElement(tag);
  elem.setAttribute(`class`, className);
  elem.innerHTML = htmlString.trim();
  return elem;
};

utils.createPropIfUndefined = function(obj, key, value = []){
  if(!obj.hasOwnProperty(key)){
    obj[key] = value;
  }
};

utils.serializeFormToObject = function(form){
  const output = {};
  if (typeof form == `object` && form.nodeName == `FORM`) {
    for (const field of form.elements) {
      if (field.name && !field.disabled && field.type != `file` && field.type != `reset` && field.type != `submit` && field.type != `button`) {
        if (field.type == `select-multiple`) {
          for (const option of field.options) {
            if(option.selected) {
              utils.createPropIfUndefined(output, field.name);
              output[field.name].push(option.value);
            }
          }
        } else if ((field.type != `checkbox` && field.type != `radio`) || field.checked) {
          utils.createPropIfUndefined(output, field.name);
          output[field.name].push(field.value);
        }
      }
    }
  }
  return output;
};

//CODE ADDED START
utils.queryParams = function(params){
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + `=` + encodeURIComponent(params[k]))
    .join(`&`);
};
//CODE ADDED END

utils.convertDataSourceToDbJson = function(){
  const productJson = [];
  for(const key in dataSource.products){
    productJson.push(Object.assign({id: key}, dataSource.products[key]));
  }

  console.log(JSON.stringify({product: productJson, order: []}, null, `  `));
};

//CODE ADDED START
utils.numberToHour = function(number){
  return (Math.floor(number) % 24) + `:` + (number % 1 * 60 + ``).padStart(2, `0`);
};

utils.hourToNumber = function(hour){
  const parts = hour.split(`:`);

  return parseInt(parts[0]) + parseInt(parts[1])/60;
};

utils.dateToStr = function(dateObj){
  return dateObj.toISOString().slice(0, 10);
};

utils.addDays = function(dateStr, days){
  const dateObj = new Date(dateStr);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};
//CODE ADDED END

Handlebars.registerHelper(`ifEquals`, function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper(`joinValues`, function(input, options) {
  return Object.values(input).join(options.fn(this));
});

export default utils;

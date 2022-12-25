//our own module for creating a date
/** 
 * this is using a module which is similar to just sharing data or variables through
 * files. you can share a function or data and have multiple exports. 
 * to use it in the file you must require it like this 
 * const varName = require(__dirname + "/filename.js");
 * 
*/

module.exports.getDate = function() {
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };

  return today.toLocaleDateString("en-US", options);
}

module.exports.getDay = function() {
  const today = new Date();

  const options = {
    weekday: 'long'
  }
  
  return today.toLocaleDateString("en-US", options);
}


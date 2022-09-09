const {format} = require('timeago.js')

const helpers = {}

helpers.timeago = (timestamp) =>{
    return format(timestamp);
};

helpers.condIf = (v1, v2, options) => {
    console.log('v1:', v1)
    console.log('v2:', v2)
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  };

module.exports = helpers;
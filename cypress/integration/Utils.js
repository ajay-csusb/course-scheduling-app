const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

let url = 'http://theme-csusb.pantheonsite.io/class-schedule';
if (process.env.NODE_ENV === 'local') {
  url = process.env.LOCAL_URL;
}
module.exports = {
  url: url,
}
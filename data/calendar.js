var key = require('./googleapi-key.json').private_key;
const SERVICE_ACCT_ID = '<service_account>@<project_name>.iam.gserviceaccount.com';
const CALENDAR_ID = {
  'primary': '<main-calendar-id>@gmail.com',
  'calendar-1': 'calendar1@group.calendar.google.com',
  'calendar-2': 'calendar2@group.calendar.google.com'
};
const TIMEZONE = 'UTC+08:00';
 
module.exports.key = key;           //or if using json keys - module.exports.key = key; 
module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.calendarId = CALENDAR_ID;
module.exports.timezone = TIMEZONE;
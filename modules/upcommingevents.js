const ical = require('ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 
ical.fromURL('https://cloud.flamingpalm.com/remote.php/dav/calendars/discord-178435947816419328/flamingpalm_shared_by_niels?export', {}, function (err, data) {
    for (let k in data) {
        if (data.hasOwnProperty(k)) {
            var ev = data[k];
            if (data[k].type == 'VEVENT') {
                console.log(`${ev.summary} is in ${ev.location} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('en-GB')}`);
 
            }
        }
    }
});
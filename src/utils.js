import moment from 'moment-timezone/builds/moment-timezone-with-data';

function getFullDateFrom(timeInS, timezone) {
  return moment(timeInS * 1000)
    .tz(timezone)
    .format('LLL');
}

function getTimeFrom(timeInS, timezone) {
  return moment(timeInS * 1000)
    .tz(timezone)
    .format('LT');
}

function getDateFrom(timeInS, timezone) {
  return moment(timeInS * 1000)
    .tz(timezone)
    .format('DD/MM');
}

export { getFullDateFrom, getTimeFrom, getDateFrom };

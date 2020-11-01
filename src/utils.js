import moment from 'moment-timezone/moment-timezone';

function getFullDateFrom(timeInS, timezone) {
  if (timezone === 'Asia/Kolkata') {
    return moment(timeInS * 1000).format('LLL');
  } else {
    return moment(timeInS * 1000)
      .tz(timezone)
      .format('LLL');
  }
}

function getTimeFrom(timeInS, timezone) {
  if (timezone === 'Asia/Kolkata') {
    return moment(timeInS * 1000).format('LT');
  } else {
    return moment(timeInS * 1000)
      .tz(timezone)
      .format('LT');
  }
}

export { getFullDateFrom, getTimeFrom };

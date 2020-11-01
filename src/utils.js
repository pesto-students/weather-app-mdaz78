import moment from 'moment-timezone/moment-timezone';

function getDateFrom(timeInMs, timezone) {
  if (timezone === 'Asia/Kolkata') {
    return moment(timeInMs * 1000).format('LLL');
  } else {
    return moment(timeInMs * 1000)
      .tz(timezone)
      .format('LLL');
  }
}

export { getDateFrom };

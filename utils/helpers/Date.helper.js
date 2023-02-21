const dayjs = require("dayjs");

class DateHelper {
  calculateStartOfPeriod(date, precision) {
    return dayjs(date).startOf(precision).toDate();
  }
  calculateEndOfPeriod(date, precision) {
    return dayjs(date).endOf(precision).toDate();
  }
}

module.exports = DateHelper;

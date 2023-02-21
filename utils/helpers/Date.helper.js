const dayjs = require("dayjs");

class DateHelper {
  static calculateStartOfPeriod(date, precision) {
    return dayjs(date).startOf(precision).toDate();
  }
  static calculateEndOfPeriod(date, precision) {
    return dayjs(date).endOf(precision).toDate();
  }
}

module.exports = DateHelper;

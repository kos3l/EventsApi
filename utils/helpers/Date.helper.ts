const dayjs = require("dayjs");
import { DatePrecision } from "../../models/types/DatePrecision";

class DateHelper {
  static calculateStartOfPeriod(date: Date, precision: DatePrecision): Date {
    return dayjs(date).startOf(precision).toDate();
  }
  static calculateEndOfPeriod(date: Date, precision: DatePrecision): Date {
    return dayjs(date).endOf(precision).toDate();
  }
}

module.exports = DateHelper;

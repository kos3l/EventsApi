const dayjs = require("dayjs");
import { DatePrecision } from "../../models/types/DatePrecision";

class DateHelper {
  /**
   *
   * @param date Date
   * @param precision DatePrecision
   * @returns Date
   */
  static calculateStartOfPeriod(date: Date, precision: DatePrecision): Date {
    return dayjs(date).startOf(precision).toDate();
  }

  /**
   *
   * @param date Date
   * @param precision DatePrecision
   * @returns Date
   */
  static calculateEndOfPeriod(date: Date, precision: DatePrecision): Date {
    return dayjs(date).endOf(precision).toDate();
  }
}

module.exports = DateHelper;

type Options = {
  as: 'seconds' | 'milliseconds';
};

export class DurationConstants {
  static oneSecond(options?: Options): number {
    if (options && options.as === 'milliseconds') {
      return 1000;
    }

    return 1;
  }

  static oneMinute(options?: Options): number {
    return DurationConstants.oneSecond(options) * 60;
  }

  static oneHour(options?: Options): number {
    return DurationConstants.oneMinute(options) * 60;
  }

  static oneDay(options?: Options): number {
    return DurationConstants.oneHour(options) * 24;
  }

  static oneWeek(options?: Options): number {
    return DurationConstants.oneDay(options) * 7;
  }

  static oneMonth(options?: Options): number {
    return DurationConstants.oneDay(options) * 30;
  }
}

import { DurationConstants } from '@/utils/time/duration-constants';

export class CacheValue {
  value?: string;
  ttl: number = DurationConstants.oneSecond() * 6;
}

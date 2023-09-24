import { QueryHitItem } from './query.hit.item';

type QueryHits<T> = {
  total: { value: number };
  max_score: null;
  hits: QueryHitItem<T>[];
};

export class QueryPitResponse<T> {
  id: string;
  took: number;
  timed_out: boolean;
  // _shards: { total: 3, successful: 3, skipped: 0, failed: 0 };
  hits: QueryHits<T>;
}

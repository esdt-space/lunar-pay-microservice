export class QueryHitItem<T> {
  _index: string;
  _id: string;
  _type: '_doc';
  _score: number | null;
  _source: T;
  sort: number[];
}

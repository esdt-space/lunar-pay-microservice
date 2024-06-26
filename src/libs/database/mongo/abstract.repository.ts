import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, Connection } from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected constructor(
    public readonly model: Model<TDocument>,
  ) {}

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery);
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.findOne(filterQuery).orFail();
  }

  async create(document: Partial<Omit<TDocument, '_id'>>): Promise<TDocument> {
    return this.model.create(document);
  }
}

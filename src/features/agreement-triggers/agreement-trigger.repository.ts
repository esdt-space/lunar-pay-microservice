import { AbstractRepository } from "@/libs/database/mongo";
import { Injectable } from "@nestjs/common";
import { AgreementTrigger } from "./agreement-trigger.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class AgreementTriggerRepository extends AbstractRepository<AgreementTrigger> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(AgreementTrigger.name) public model: Model<AgreementTrigger>,
  ) {
    super(model, connection);
  }
}

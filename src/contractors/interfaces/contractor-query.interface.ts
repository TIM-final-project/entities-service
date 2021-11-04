import { FindOperator } from "typeorm";

export interface ContractorQuery {
  active?: boolean,
  id?: number | FindOperator<number>,
}
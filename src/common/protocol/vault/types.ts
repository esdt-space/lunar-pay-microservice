type NumericValue = {
  type: string;
  value: string;
}

type Field = {
  value: NumericValue;
  name: string;
}

type TypeCardinality = {
  lowerBound: number;
  upperBound: number;
}

type FieldDefinition = {
  name: string;
  type: string;
}

type TupleType = {
  name: string;
  typeParameters: any[];
  cardinality: TypeCardinality;
  fieldDefinitions: FieldDefinition[];
}

export type Struct = {
  type: TupleType;
  fields: Field[];
  fieldsByName: Map<string, Field>
}

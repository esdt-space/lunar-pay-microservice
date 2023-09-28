import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ContractFunction,
  EndpointDefinition,
  ResultsParser,
  SmartContract,
  TypedValue,
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { IContractQuery } from '@multiversx/sdk-network-providers/out/interface';

const resultsParser = new ResultsParser();

@Injectable()
export class ContractQueryHandler {
  proxy: ProxyNetworkProvider;

  constructor(private readonly config: ConfigService) {
    this.proxy = new ProxyNetworkProvider(
      this.config.get<string>('urls.blockchainApi'),
    );
  }

  async queryContract(
    contract: SmartContract,
    functionName: string,
    args: TypedValue[] = [],
  ) {
    const query = contract.createQuery({
      func: new ContractFunction(functionName),
      args: args,
    });

    const endpointDefinition = contract.getEndpoint(functionName);

    return this._queryContract(query, endpointDefinition);
  }

  private async _queryContract(
    query: IContractQuery,
    endpointDefinition: EndpointDefinition,
  ) {
    const queryResponse = await this.proxy.queryContract(query);
    return resultsParser.parseQueryResponse(queryResponse, endpointDefinition);
  }
}

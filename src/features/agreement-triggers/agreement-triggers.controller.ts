import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { NativeAuthGuard } from "@multiversx/sdk-nestjs-auth";

import { AgreementTriggerService } from "./agreement-triggers.service";
import PaginationParams from "@/common/models/pagination.params.model";

@ApiTags('Agreement Triggers')
@Controller('agreement-triggers')
export class AgreementTriggersController {
  constructor(private readonly agreementTriggersService: AgreementTriggerService) {}

  @Get(':id/all')
  @UseGuards(NativeAuthGuard)
  @ApiOperation({
    summary: 'Agreement triggers list',
    description: 'Returns a list of triggers for a specific agreement',
  })
  async list(
    @Param('id') id: string,
    @Query('pagination') pagination: PaginationParams,
  ) {
    return this.agreementTriggersService.findAllAgreementTriggers(id, pagination);
  }
}

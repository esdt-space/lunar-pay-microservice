import { UsePipes, ValidationPipe } from '@nestjs/common';

@UsePipes(new ValidationPipe({ whitelist: true }))
export default class BaseController {}

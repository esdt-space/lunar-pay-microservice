import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  MONGO_DB_HOST: string;
  @IsString()
  MONGO_DB_NAME: string;

  @IsString()
  REDIS_HOST: string;
  @IsNumber()
  REDIS_PORT: number;
  @IsString()
  REDIS_USERNAME: string;
  @IsString()
  REDIS_PASSWORD: string;

  @IsString()
  EVENTS_NOTIFIER_CONNECTION_STRING: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

import { Module } from '@nestjs/common';
import { PostgresDatabaseModule } from './postgres/postgres.database.module';

@Module({
  imports: [PostgresDatabaseModule],
  exports: [PostgresDatabaseModule],
})
export class DatabaseProvidersModule {}

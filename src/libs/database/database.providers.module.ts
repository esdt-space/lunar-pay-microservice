import { Module } from '@nestjs/common';
import { MongoDatabaseModule } from './mongo';
import { PostgresDatabaseModule } from './postgres/postgres.database.module';

@Module({
  imports: [MongoDatabaseModule, PostgresDatabaseModule],
  exports: [MongoDatabaseModule, PostgresDatabaseModule],
})
export class DatabaseProvidersModule {}

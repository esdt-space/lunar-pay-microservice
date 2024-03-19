import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),

        logging: ['error', 'migration', 'schema'],
        synchronize: true,
        autoLoadEntities: true,
      })
    }),
  ],
})
export class PostgresDatabaseModule {}
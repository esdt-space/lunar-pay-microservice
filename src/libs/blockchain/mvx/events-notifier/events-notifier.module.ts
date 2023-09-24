import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('EVENTS_NOTIFIER_CONNECTION_STRING'),
      }),
    }),
  ],
})
export class BlockchainEventsNotifierModule {}

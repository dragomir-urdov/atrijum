import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Config, config } from './config';
import { validate } from './config/config.validate';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Config ------------------------------------------------------------------
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [config],
      validate,
    }),

    // Database ----------------------------------------------------------------
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(Config.MONGO_URI),
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UserModule,
  ],
})
export class AppModule {}

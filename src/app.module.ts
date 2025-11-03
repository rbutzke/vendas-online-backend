import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PgModule } from './common/pg/pg.module';
import { AddressModule } from './address/address.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { Module} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager/dist/cache.module';
import { RedisModule } from './common/redis/redis.module';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      // Carrega o .env automaticamente
      isGlobal: true, // Torna o ConfigService disponível em toda a aplicação
    }),
    PgModule,
    AddressModule,
    CityModule,
    StateModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

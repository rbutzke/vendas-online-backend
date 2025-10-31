import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PgModule } from './common/pg/pg.module';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      // Carrega o .env automaticamente
      isGlobal: true, // Torna o ConfigService disponível em toda a aplicação
    }),
    PgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
   
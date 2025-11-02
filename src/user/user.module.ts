import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PgModule } from '../common/pg/pg.module';

@Module({
  imports: [PgModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

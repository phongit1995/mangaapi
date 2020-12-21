import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/database/user.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"user",schema:userSchema}]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}

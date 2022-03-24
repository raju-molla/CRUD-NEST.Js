import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './user/user.module';

@Module({
  imports: [
    userModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(
      'mongodb+srv://user:01703634507@cluster0.66f2j.mongodb.net/userDataBase?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

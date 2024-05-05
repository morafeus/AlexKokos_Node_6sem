import { Module } from '@nestjs/common';
import {  ConfigModule  } from '@nestjs/config'
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { DesciplineModule } from './desciplines/desciplines.module';
import { PrismaModule } from './prisma/prisma.module';
import { SocketService } from './socket/socket.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    PrismaModule,
    DesciplineModule,
    CoursesModule,
    UserModule
  ],
  providers: [SocketService]
})
export class AppModule {}

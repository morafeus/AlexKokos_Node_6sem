import { Module } from '@nestjs/common';
import {  ConfigModule  } from '@nestjs/config'
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { DesciplineModule } from './desciplines/desciplines.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    PrismaModule,
    DesciplineModule,
    CoursesModule
  ],
  controllers: [UserController],
})
export class AppModule {}

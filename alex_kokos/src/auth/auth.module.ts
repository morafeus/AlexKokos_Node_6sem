import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";
import { RtJwtStrategy } from "./strategy/refresh.strategy";

@Module({ 
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RtJwtStrategy]
})

export class AuthModule{}
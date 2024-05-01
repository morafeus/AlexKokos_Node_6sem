import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DesciplinesController } from "./desciplines.controller";
import { DesciplineService } from "./desciplines.service";

@Module({ 
    imports: [JwtModule.register({})],
    controllers: [DesciplinesController],
    providers: [DesciplineService]
})

export class DesciplineModule{}
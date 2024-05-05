import { OnGatewayConnection } from "@nestjs/websockets";
export declare class SocketService implements OnGatewayConnection {
    handleEvent(dto: any, client: any): void;
    handleConnection(client: any): void;
}

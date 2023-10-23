import { ConnectionType, DestinationType } from "types";

export function returnRandomPosition(
   connection: ConnectionType
): string {
   if(connection.connections.length === 0) {
      return "";
   }
   return (
      connection.connections[Math.floor(Math.random() * connection.connections.length)].name
   );
} 
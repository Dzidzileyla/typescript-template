import { ApiServer } from '../src/server';

export function buildApiServer(enableLogging?: boolean): ApiServer {
  const apiServer = new ApiServer();

  return apiServer;
}

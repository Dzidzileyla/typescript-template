import { ApiServer } from './server';
import { Seed } from './seed';

export const start = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const apiServer = new ApiServer();
    const seed = new Seed();

    Promise.all([apiServer.start(), seed.init()])
      .then(() => resolve())
      .catch(reject);

    const graceful = () => {
      Promise.all([apiServer.stop(), seed.stop()]).then(() => process.exit(0));
    };

    // Stop graceful
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
  });
};

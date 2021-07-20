import { Container } from 'typescript-ioc';

import { HelloWorldService } from '../../src/services';
import { ApiServer } from '../../src/server';
import { buildApiServer } from '../helper';

import { connect, closeDatabase } from '../../src/db';

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe('Hello World service', () => {
  let app: ApiServer;
  let service: HelloWorldService;

  beforeAll(() => {
    app = buildApiServer();
    service = Container.get(HelloWorldService);
  });

  test('canary test verifies test infrastructure', () => {
    expect(service).not.toBeUndefined();
  });

  describe('Given greeting()', () => {
    context('when "Juan" provided', () => {
      const name = 'Juan';
      test('then return "Hello, Juan!"', async () => {
        expect(await service.greeting(name)).toEqual(`Hello, ${name}!`);
      });
    });

    context('when no name provided', () => {
      test('then return "Hello, World!"', async () => {
        expect(await service.greeting()).toEqual('Hello, World!');
      });
    });
  });
});

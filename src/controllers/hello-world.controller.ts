import { GET, Path, PathParam } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { HelloWorldApi } from '../services';

@Path('/hello')
export class HelloWorldController {
  service: HelloWorldApi;

  constructor(@Inject service: HelloWorldApi) {
    this.service = service;
  }

  @GET
  async sayHelloToUnknownUser(): Promise<string> {
    return this.service.greeting();
  }

  @Path(':name')
  @GET
  async sayHello(@PathParam('name') name: string): Promise<string> {
    return this.service.greeting(name);
  }
}

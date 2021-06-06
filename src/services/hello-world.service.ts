import { HelloWorldApi } from './hello-world.api';
import { Inject } from 'typescript-ioc';

import { HelloWorldRepository } from '../repositories/hello-world.repository';
export class HelloWorldService implements HelloWorldApi {
  
  helloWorldRepository: HelloWorldRepository;

  constructor(@Inject helloWorldRepository: HelloWorldRepository) {
    this.helloWorldRepository = helloWorldRepository;
  }

  async greeting(name: string): Promise<string> {
    return this.helloWorldRepository.hello(name);
  }
}

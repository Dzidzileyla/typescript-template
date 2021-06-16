import { IHelloWorld } from './hello-world.interface';
export class HelloWorldRepository implements IHelloWorld {

  hello(name = 'World'): string {

    return `Hello, ${name}!`;
  }
}

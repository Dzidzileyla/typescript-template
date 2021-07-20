import { IHelloWorld } from './hello-world.interface';
export class HelloWorldRepository implements IHelloWorld {

  hello(name): string {
    return `Hello, ${name}!`;
  }
}

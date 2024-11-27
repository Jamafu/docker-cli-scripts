import 'reflect-metadata';

import { Container } from 'inversify';
import { ProcessExecution } from './services/ProcessExecution';
import { DockerService } from './services/DockerService';

const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

container.bind<ProcessExecution>(ProcessExecution).toSelf().inSingletonScope();
container.bind<DockerService>(DockerService).toSelf().inSingletonScope();

export { container };

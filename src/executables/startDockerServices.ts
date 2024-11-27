import { container } from '../inversify.config';
import { DockerService } from '../services/DockerService';

const dockerService = container.get<DockerService>(DockerService);

dockerService.startDockerServices().catch((error) => {
  console.error('Failed to start docker services', error);
});

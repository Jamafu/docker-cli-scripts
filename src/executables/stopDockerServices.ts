import { container } from '../inversify.config';
import { DockerService } from '../services/DockerService';

const dockerService = container.get<DockerService>(DockerService);

dockerService.stopDockerServices().catch((error) => {
  console.error('Failed to stop docker services', error);
});

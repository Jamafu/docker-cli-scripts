import { container } from '../inversify.config';
import { DockerService } from '../services/DockerService';

const dockerService = container.get<DockerService>(DockerService);

dockerService.startDockerLogs().catch((error) => {
  console.error('Failed to start docker services', error);
});

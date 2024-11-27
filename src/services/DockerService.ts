import { injectable } from 'inversify';

import { ProcessExecution } from './ProcessExecution';
import { PromptService } from './PromptService';

@injectable()
export class DockerService {
  constructor(
    private readonly processExecutor: ProcessExecution,
    private readonly promptService: PromptService,
  ) {}

  public async startDockerServices(): Promise<void> {
    const dockerServices = await this.loadDockerServiceNames();
    if (dockerServices.length === 0) {
      console.log('No services found');
      return;
    }

    const selectedServices = await this.promptService.multiSelect('Available services', dockerServices);
    console.log('Starting selected services:', selectedServices);
    await this.processExecutor.doExecuteWithLiveLogs(`docker-compose up -d ${selectedServices.join(' ')}`);
  }

  public async stopDockerServices(): Promise<void> {
    const runningServices = await this.loadRunningDockerServices();
    if (runningServices.length === 0) {
      console.log('No running services found');
      return;
    }

    const selectedServices = await this.promptService.multiSelect('Select services to stop:', runningServices);
    await this.processExecutor.doExecuteWithLiveLogs(`docker stop ${selectedServices.join(' ')}`);
  }

  public async startDockerLogs(): Promise<void> {
    const runningServices = await this.loadRunningDockerServices();
    if (runningServices.length === 0) {
      console.log('No running services found');
      return;
    }

    const selectedService = await this.promptService.select('Which logs do you need?', runningServices);
    await this.processExecutor.doExecuteWithLiveLogs(`docker logs ${selectedService}`);
  }

  private async loadDockerServiceNames(): Promise<string[]> {
    const dockerComposeExists = await this.dockerComposeExists();
    if (!dockerComposeExists) {
      console.log('No docker-compose.yml found');
      return [];
    }

    try {
      const result = await this.processExecutor.executeWithoutLiveLogs(`docker-compose config --services`);
      return result.split('\n').filter((serviceName) => serviceName.length > 0);
    } catch (error) {
      console.error('Failed to load docker services');
      return [];
    }
  }

  private async dockerComposeExists(): Promise<boolean> {
    const itemsInDirectory = await this.processExecutor.executeWithoutLiveLogs('ls');
    return itemsInDirectory.includes('docker-compose.yml');
  }

  private async loadRunningDockerServices(): Promise<string[]> {
    const result = await this.processExecutor.executeWithoutLiveLogs(`docker ps --format '{{.Names}}'`);
    return result.split('\n').filter((serviceName) => serviceName.length > 0);
  }
}

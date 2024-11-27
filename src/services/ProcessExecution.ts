import { ExecException } from 'child_process';
import { injectable } from 'inversify';
import { exec, spawn } from 'node:child_process';

interface CommandExecutionResult {
  err?: ExecException;
  stdout: string;
  stderr: string;
}

@injectable()
export class ProcessExecution {
  public async executeWithoutLiveLogs(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, _stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  public async doExecuteWithLiveLogs(command: string): Promise<CommandExecutionResult> {
    return new Promise((resolve, reject) => {
      const child = spawn(command, { shell: true });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        const updatedString = stderr + data;
        if (stderr !== updatedString) {
          console.info(updatedString);
          stderr += data;
        }
      });

      child.stderr.on('data', (data) => {
        const updatedString = stderr + data;
        if (stderr !== updatedString) {
          console.info(updatedString);
          stderr += data;
        }
      });

      child.on('close', (code) => {
        if (code !== 0) {
          reject({ err: new Error(`Process exited with code ${code}`), stdout, stderr });
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }
}

import { injectable } from 'inversify';
// @ts-ignore
import { MultiSelect, Select } from 'enquirer';

@injectable()
export class PromptService {
  public async select(message: string, choices: string[]): Promise<string> {
    const prompt = new Select({
      name: 'color',
      message,
      choices,
    });

    return await prompt.run();
  }

  public async multiSelect(message: string, choices: string[]): Promise<string[]> {
    const enquirerChoices = choices.map((choice) => ({ name: choice, message: choice }));
    const multiSelectOptions = new MultiSelect({
      name: 'value',
      message,
      limit: 7,
      choices: enquirerChoices,
    });

    return await multiSelectOptions.run();
  }
}

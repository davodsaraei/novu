import { IsDefined, IsOptional } from 'class-validator';
import { JobEntity } from '@novu/dal';

import { EnvironmentWithUserCommand } from '../../commands/project.command';

export class AddJobCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  jobId: string;

  @IsOptional()
  job?: JobEntity;
}

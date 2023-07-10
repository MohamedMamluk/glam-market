import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/schemas/user.schema';

export const Roles = (...role: UserRole[]) => SetMetadata('roles', role);

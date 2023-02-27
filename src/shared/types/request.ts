import { User as LocalUser } from '../../users/schemas/users.schema';

declare global {
  namespace Express {
    interface User extends LocalUser {}
  }
}

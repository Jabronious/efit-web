import * as mongoose from 'mongoose';
import { configs } from '../../../configuration';

export const mongooseConnectionProvider = [
  {
    provide: 'MONGOOSE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(configs.COSMOS_CONNECTION_STRING),
  },
];

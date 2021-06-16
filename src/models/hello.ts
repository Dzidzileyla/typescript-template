import * as mongoose from 'mongoose';

import { HelloSchema } from '../schemas';
import { Hello } from '../types';

const HelloModel = mongoose.model<Hello>('hello', HelloSchema);

export default HelloModel;
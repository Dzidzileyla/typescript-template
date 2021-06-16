import { Hello } from '../types';

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const HelloSchema = new Schema<Hello>({
  value: { type: String, default: 'World' },
});

export default HelloSchema;

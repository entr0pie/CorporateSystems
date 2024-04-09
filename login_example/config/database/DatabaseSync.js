import { UserModel } from '../../models/UserModel.js';
export async function syncDatabaseModels() {
  await UserModel.sync();
}
import { UserModel } from '../../user/models/UserModel.js';
export async function syncDatabaseModels() {
  await UserModel.sync();
}
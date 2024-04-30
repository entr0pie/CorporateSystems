import { ProductModel } from '../../models/ProductModel.js';
import { UserModel } from '../../models/UserModel.js';

export async function syncDatabaseModels() {
  await UserModel.sync();
  await ProductModel.sync();
}
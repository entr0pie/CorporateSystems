import { ProductModel } from '../../models/ProductModel.js';
import { UserModel } from '../../models/UserModel.js';
import { DepositModel } from '../../models/DepositModel.js'

export async function syncDatabaseModels() {
  await UserModel.sync();
  await ProductModel.sync();
  await DepositModel.sync();
}
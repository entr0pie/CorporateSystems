import { ProductModel } from '../../models/ProductModel.js';
import { UserModel } from '../../models/UserModel.js';
import { DepositModel } from '../../models/DepositModel.js'
import { ProductMovementModel } from '../../models/ProductMovementModel.js';

export async function syncDatabaseModels() {
  await UserModel.sync();
  await ProductModel.sync();
  await DepositModel.sync();
  await ProductMovementModel.sync();
}
import { ProductModel } from '../../models/ProductModel.js';
import { UserModel } from '../../models/UserModel.js';
import { DepositModel } from '../../models/DepositModel.js'
import { ProductMovementModel } from '../../models/ProductMovementModel.js';
import { DepartmentModel } from '../../models/DepartmentModel.js';
import { SuplierModel } from '../../models/SuplierModel.js';
import { CostCenterModel } from '../../models/CostCenterModel.js';
import { PurchaseRequestModel } from '../../models/PurchaseRequestModel.js';

export async function syncDatabaseModels() {
  await DepartmentModel.sync();
  await UserModel.sync();
  await ProductModel.sync();
  await DepositModel.sync();
  await ProductMovementModel.sync();
  await SuplierModel.sync();
  await CostCenterModel.sync();
  await PurchaseRequestModel.sync();
}
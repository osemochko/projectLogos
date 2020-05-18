

import { ICart } from './food.interface';
import { IDelivery } from './delivery';
import { User } from './user';

export interface IOrder {
  user: User;
  order: ICart[];
  delivery: IDelivery;
}
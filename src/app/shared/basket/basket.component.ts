import { Component } from "@angular/core";
import { IDish, ICart, ICartResponse } from "src/app/interfaces/food.interface";
import { BasketService } from "src/app/services/basket.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IDelivery } from 'src/app/interfaces/delivery';
import { User } from 'src/app/interfaces/user';
import { IOrder } from 'src/app/interfaces/order';

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"],
})

export class BasketComponent {
  public totalQ: number;
  public subPrice: number;
  public cartList: ICart[];
  public deliveryList: IDelivery[]; 
  public type: IDelivery;
  public user: User;
  public order: IOrder;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private basketService: BasketService
  ) {
    this.loadCart();
  }

  private loadCart() {
    this.basketService.getBasket().subscribe((res) => {
      this.cartList = res;
      this.subtotal();
      this.calculateQuantity();
    });

    this.basketService.getDelivery().subscribe((res:IDelivery[]) => {
      this.deliveryList = res;
      this.type = res[0];
    });
  }

  public redirectToDish(id: number): void {
    this.router.navigate(["dish", id]);
  }

  private subtotal() {
    let total = 0;
    for (let cart of this.cartList) {
      total += cart.dish.price * cart.quantity;
    }
    this.subPrice = total;
  }

  private calculateQuantity() {
    let totalQuantity = 0;
    for (let cart of this.cartList) {
      totalQuantity += cart.quantity;
    }
    this.totalQ = totalQuantity;
  }

  public increment(dish: IDish) {
    this.basketService.addToBasket(dish).subscribe((newCartList: ICartResponse) => {
        this.cartList = newCartList.basket;
        this.subtotal();
        this.calculateQuantity();
      });
  }

  public decrement(dish: IDish) {
    this.basketService.removeFromBasket(dish.id).subscribe((newCartList: ICartResponse) => {
        this.cartList = newCartList.basket;
        this.subtotal();
        this.calculateQuantity();
      });
  }

  public removeFromBasket(cartDish: ICart) {
    this.basketService.removeFromBasket(cartDish.dish.id, cartDish.quantity).subscribe((newCartList: ICartResponse) => {
        this.cartList = newCartList.basket;
        this.subtotal();
        this.calculateQuantity();
      });
  }

  // public addToDelivery(delivery: IDelivery) {
  //   this.basketService.addToDelivery(delivery).subscribe(res => console.log(res));
  // }

  public addToOrder(order: ICart[]) {
    this.basketService.addToOrder(order).subscribe((newOrderList: IOrder) => {
      console.log(newOrderList);
      this.order = newOrderList;
    })
  }

}

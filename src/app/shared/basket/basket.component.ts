import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IDish, ICart, ICartResponse } from "src/app/interfaces/food.interface";
import { BasketService } from "src/app/services/basket.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"],
})
export class BasketComponent {
  public totalQ: number;
  public totalPrice: number;
  public cartList: any;

  @Input() quantity: number;
  @Output() onChange = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private basketService: BasketService
  ) {
    this.loadCart();
  }

  loadCart() {
    this.basketService.getBasket().subscribe((res) => {
      this.cartList = res;
      this.calculateTotal();
      this.calculateQuantity();
      console.log(this.cartList);
    });
  }

  private calculateTotal() {
    let total = 0;
    for (let cart of this.cartList) {
      total += cart.dish.price * cart.quantity;
    }
    this.totalPrice = total;
  }

  private calculateQuantity() {
    let totalQuantity = 0;
    for (let cart of this.cartList) {
      totalQuantity += cart.quantity;
    }
    this.totalQ = totalQuantity;
  }

  //   removeFromCart (index: number) {
  //     this.basketService.remove(index);
  // }

  public increment(dish: IDish) {
    this.basketService
      .addToBasket(dish)
      .subscribe((newCartList: ICartResponse) => {
        this.cartList = newCartList.basket;
        this.calculateTotal();
        this.calculateQuantity();
      });
  }

  public decrement(dish: IDish) {
    this.basketService
      .removeFromBasket(dish.id)
      .subscribe((newCartList: ICartResponse) => {
        this.cartList = newCartList.basket;
        this.calculateTotal();
        this.calculateQuantity();
      });
  }

  public removeFromBasket(cartDish: ICart) {
    this.basketService
      .removeFromBasket(cartDish.dish.id, cartDish.quantity)
      .subscribe((newCartList: ICartResponse) => {
        this.cartList = newCartList.basket;
        this.calculateTotal();
        this.calculateQuantity();
      });
  }

  //   public clearBasket() {
  //     this.basketService.clearBasket();
  //  }
}

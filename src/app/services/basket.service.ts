import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDish, ICart, ICartResponse } from '../interfaces/food.interface';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
  
@Injectable({
    providedIn: 'root'
})
export class BasketService{
    private readonly URL: string = environment.apiUrl;

    // private LS_BASKET_KEY: string = "basket";
    private LS_USER_KEY: string = "user";
   
    public totalQ: number;
    public cartList: ICart[];
    public basketItemsCount: BehaviorSubject<number>;
    
    constructor(
      private http: HttpClient,
      private authService: AuthService,
      ){   
        this.basketItemsCount = new BehaviorSubject(0);
    } 
     
    public addToBasket(newDish: IDish) {
      const user = JSON.parse(localStorage.getItem(this.LS_USER_KEY));
      const body = {dish: newDish, email: user.email}
      return this.http.post(`${this.URL}/add-to-basket`, body).pipe(
        tap((basketResponse: ICartResponse) => this.basketItemsCount.next(basketResponse.basket.length))
      )
   
      // const index = this.cartList.findIndex((item: ICart) => item.dish.id === newDish.id)
      // index < 0 ? this.cartList.push({dish: newDish, quantity: 1}) : this.cartList[index].quantity++ 
    }

    public removeFromBasket(id: number, quantity?: number) {
      const q: number = quantity ? quantity : 1;
      const user = JSON.parse(localStorage.getItem(this.LS_USER_KEY));
      const body = {dish_id: id, email: user.email, quantity: q}
      return this.http.post(`${this.URL}/remove-from-basket`, body).pipe(
        tap((basketResponse: ICartResponse) => this.basketItemsCount.next(basketResponse.basket.length))
      )
   
    }

    public getBasket(): Observable<ICart[]> {
      const user = JSON.parse(localStorage.getItem(this.LS_USER_KEY));
      return this.http.get(`${this.URL}/users`)
      .pipe(
        map((users: User[]) => users.find((item: User) => item.email === user.email)),
        map((user: User) => user? user.basket : null),
        tap((basket: any) => this.basketItemsCount.next(basket.reduce((acc, item) => acc + item.quantity,0)))
      )
    }

    // increment(dish: IDish): void {
    //   console.log(id) 
    //   const index = this.cartList.findIndex((item: ICart) => item.dish.id === id)
    //   console.log(index)
    //   if(index >= 0){
        
    //     this.cartList[index].quantity = this.cartList[index].quantity+1;
    //     console.log(this.cartList[index].quantity)
    //   }
    // }

    // public remove() {
    //   return this.http.post(`${this.URL}/remove-from-basket`)
      // let basket = this.cart$.getValue();
      // basket.splice(index, 1);
      // this.cart$.next(basket);
     
    // }

    // public clear() {
    //   return this.http.delete(`${this.URL}/users/userIndex/basket`)
    //   localStorage.removeItem('basket');
    // }

  //   private calculateQuantity() {
  //     let totalQuantity = 0;
  //     for (let cart of this.cartList) {
  //       console.log(this.cartList)
  //         totalQuantity += cart.quantity
  //     }
  //     this.totalQ = totalQuantity;
  //     console.log(this.totalQ)
  // }
  
    

    // decrement(quantity: number): void {
    //   const index = this.cartList.findIndex((item: ICart) => item.dish.id === id)
    //   return this.http.get(`${this.URL}/users`).pipe(
    //     map((item: ICart) => index >= 0? this.cartList[index].quantity -= this.cartList[index].quantity),
    //   )
    // }
 
  
    // clearBasket() {
    //   this.items = [];
    //   return this.items;
    // }

    
}
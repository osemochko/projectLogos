import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDish, ICart, ICartResponse } from '../interfaces/food.interface';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { IDelivery } from '../interfaces/delivery';

  
@Injectable({
    providedIn: 'root'
})
export class BasketService{
    private readonly URL: string = environment.apiUrl;
    private LS_USER_KEY: string = "user";
     
    public cartList: ICart[];
    public basketItemsCount: BehaviorSubject<number>;
    
    constructor(
      private http: HttpClient,
      private authService: AuthService,
      ){  
        this.basketItemsCount = new BehaviorSubject(0);
    } 

    public getBasket(): Observable<ICart[]> {
      const user = JSON.parse(localStorage.getItem(this.LS_USER_KEY));
      return this.http.get(`${this.URL}/users`)
      .pipe(
        map((users: User[]) => users.find((item: User) => item.email === user.email)),
        map((user: User) => user? user.basket : null),
        tap((basket: any) => this.basketItemsCount.next(this.getBasketItemCounter(basket)))
      )
    }

    private getBasketItemCounter(basket: ICart[]): number {
      return basket.reduce((acc, item) => acc + item.quantity,0);
    }
    
    public addToBasket(newDish: IDish) {
      const user = JSON.parse(localStorage.getItem(this.LS_USER_KEY));
      const body = {dish: newDish, email: user.email}
      return this.http.post(`${this.URL}/add-to-basket`, body).pipe(
        tap((basketResponse: ICartResponse) => this.basketItemsCount.next(this.getBasketItemCounter(basketResponse.basket)))        
      )
    }

    public removeFromBasket(id: number, quantity?: number) {
      const q: number = quantity ? quantity : 1;
      const user = JSON.parse(localStorage.getItem(this.LS_USER_KEY));
      const body = {dish_id: id, email: user.email, quantity: q}
      return this.http.post(`${this.URL}/remove-from-basket`, body).pipe(
        tap((basketResponse: ICartResponse) => this.basketItemsCount.next(this.getBasketItemCounter(basketResponse.basket)))
      )   
    }

    public getDelivery() {
      return this.http.get(`${this.URL}/deliveries`);
    }

    // public addToDelivery(newDelivery: IDelivery) {
    //   const user = JSON.parse(localStorage.getItem(this.LS_USER_KEY));
    //   const body = {delivery: newDelivery, email: user.email}
    //   return this.http.post(`${this.URL}/orders`, body)
    // }

    public addToOrder(order: ICart[]) {
      const user = JSON.parse(localStorage.getItem(this.LS_USER_KEY));
      const body = {user: user.email, basket: order}
      return this.http.post(`${this.URL}/orders`, body)
    }
       
}
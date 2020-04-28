import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { ICart } from 'src/app/interfaces/food.interface';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output()
  public toggleSideNav: EventEmitter<void>;

  public isLogined$: BehaviorSubject<boolean>;
  public user$: BehaviorSubject<User>;

  public totalQ: number;
  public cartList: any;
  public hideMatBadge: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private basketService: BasketService,
  ) { 
    this.toggleSideNav = new EventEmitter<void>();
    this.isLogined$ = this.authService.isLogined$;
    this.user$ = this.authService.user$;

    this.loadCart();
    // this.totalQ = this.basketService.totalQ;
    this.hideMatBadge = false;
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['']);
    this.hideMatBadge = true;
  } 

  loadCart(){
    this.basketService.getBasket().subscribe((res) =>{
      this.cartList = res;
      this.calculateQuantity();
    })
  }

  private calculateQuantity() {
    let totalQuantity = 0;
    for (let cart of this.cartList) {
      // console.log(this.cartList)
        totalQuantity += cart.quantity
    }
    this.totalQ = totalQuantity;
    if (this.totalQ > 0) {
      this.hideMatBadge = false;
    } 
    else {this.hideMatBadge = true}
  }

  public get basketItemsCount(): BehaviorSubject<number>{
    return this.basketService.basketItemsCount;
  }
   
}

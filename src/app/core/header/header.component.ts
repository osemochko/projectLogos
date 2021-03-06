import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
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
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private basketService: BasketService,
  ) { 
    this.toggleSideNav = new EventEmitter<void>();
    this.isLogined$ = this.authService.isLogined$;
    this.user$ = this.authService.user$;
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['']);
  } 
  
  public get basketItemsCount(): BehaviorSubject<number>{
    return this.basketService.basketItemsCount;
  } 
   
}

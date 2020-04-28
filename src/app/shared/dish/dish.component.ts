import { Component } from '@angular/core';
import { IDish } from 'src/app/interfaces/food.interface';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, pluck } from 'rxjs/operators';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent{

  public dish: IDish;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private basketService: BasketService,    
  ) {

    this.route.paramMap
      .pipe(
        pluck('params', 'id'),
        switchMap((id: string) => this.crudService.getDishById(id)),
      )
      .subscribe(
        (dish: IDish) => this.dish = dish,
    );
  }

  public addToBasket(dish: IDish) {
    this.basketService.addToBasket(dish).subscribe(res => console.log(res));  
  }

}

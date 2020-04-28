import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { pluck, switchMap } from "rxjs/operators";

import { CrudService } from "src/app/services/crud.service";
import { BasketService } from 'src/app/services/basket.service';
import { IDish } from "src/app/interfaces/food.interface";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent {
  public dishes: IDish[];
  
  constructor(
    private crudService: CrudService,
    private basketService: BasketService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap
      .pipe(
        pluck("params", "group"),
        switchMap((param) => this.crudService.getFilteredDishes(param))
      )
      .subscribe((dishes: IDish[]) => (this.dishes = dishes));
  }

  public redirectToDish(id: number): void {
    this.router.navigate(["dish", id]);
  }
  
  public addToBasket(dish: IDish) {
    this.basketService.addToBasket(dish).subscribe(res => console.log(res));  
  }
}

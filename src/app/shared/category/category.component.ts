import { Component } from '@angular/core';
import { IDish } from 'src/app/interfaces/food.interface';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public dishes: IDish[];

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 

    this.route.paramMap
      .pipe(
        pluck('params', 'cat'),
        switchMap((param) => this.crudService.getFilteredDishes(param)),
      )
      .subscribe(
        (dishes: IDish[]) =>  this.dishes = dishes,
      );

  }

  public redirectToDish(id: number): void {
    this.router.navigate(['dish', id]);
  }

}

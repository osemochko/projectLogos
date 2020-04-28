import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { IDish } from '../interfaces/food.interface';
  
@Injectable({
    providedIn: 'root'
})
export class CrudService{
    
    private readonly URL: string = environment.apiUrl;
    private readonly ALL_DISHES: string = 'All dishes';
  
    constructor(private http: HttpClient){        
     }
    
    public get dishes(): Observable<IDish[]> {
        return this.http.get(`${this.URL}/dishes`).pipe(
          map((dishes: IDish[]) => dishes),
        );
    }

    public getDishById(id: string): Observable<IDish> {
        return this.http.get(`${this.URL}/dishes/${id}`).pipe(
          filter(Boolean),
          map((dish: IDish) => dish),
        );
    }

    public getFilteredDishes(group): Observable<IDish[]> {
        return this.http.get(`${this.URL}/dishes`)
          .pipe(
            map((dishes: IDish[]) => dishes.filter((dish: IDish) => group === this.ALL_DISHES || dish.group === group))
          );
    }

    public get navList(): Observable<string[]> {
        return this.http.get(`${this.URL}/dishes`)
          .pipe(
            map((dishes: IDish[]) => dishes.map((dish: IDish) => dish.group)),
            map((groups: string[]) => [...new Set(groups)]),
            map((groups: string[]) => groups.sort((a: string, b: string) => a > b ? 1 : -1)),
            map((groupsNames: string[]) => [ this.ALL_DISHES, ...groupsNames ]),
          );
    }

    public modifyDish(dish: IDish): void {
        this.http.put(`${this.URL}/dishes/${dish.id}`, dish)
          .subscribe((res) => console.log(res));
    }   
     
}
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent {

  public groups: Observable<string[]>;

  constructor(private crudService: CrudService) {
    this.groups = this.crudService.navList;
   }
}

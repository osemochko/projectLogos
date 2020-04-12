import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CategoryComponent } from './shared/category/category.component';
import { LoginComponent } from './shared/login/login.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { BasketComponent } from './shared/basket/basket.component';
import { DishComponent } from './shared/dish/dish.component';


const routes: Routes = [
  {    path: '',
    redirectTo: 'category/all',
    pathMatch: 'full',  },
  {    path: 'category',
    redirectTo: 'category/All dishes',
    pathMatch: 'full',  },
  {    path: 'category/:dish',
    component: CategoryComponent,  },
  {    path: 'dish/:id',
    component: DishComponent,  },
  {    path: 'login',
    component: LoginComponent,  },
  {    path: 'sign-up',
    component: SignUpComponent,  },
  {    path: 'basket',
    // canActivate: [AuthGuard],
    component: BasketComponent,  },
  {    path: '**',
    component: NotFoundComponent,  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

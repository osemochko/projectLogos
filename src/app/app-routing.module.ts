import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CategoryComponent } from './shared/category/category.component';
import { LoginComponent } from './shared/login/login.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { BasketComponent } from './shared/basket/basket.component';
import { DishComponent } from './shared/dish/dish.component';
import { ConditionsComponent } from './shared/conditions/conditions.component';
import { AuthGuard } from './guards/auth.guards';


const routes: Routes = [
  {    
    path: '',
    redirectTo: 'category/All dishes',
    pathMatch: 'full',  },
  {    
    path: 'category',
    redirectTo: 'category/All dishes',
    pathMatch: 'full',  },
  {   
    path: 'category/:group',
    component: CategoryComponent,  },
  {    
    path: 'dish/:id',
    component: DishComponent,  },
  {    
    path: 'conditions',
    component: ConditionsComponent,  },
  {    
    path: 'login',
    component: LoginComponent,  },
  {    
    path: 'sign-up',
    component: SignUpComponent,  },
  {    
    path: 'basket',
    canActivate: [AuthGuard],
    component: BasketComponent,  },
  {    
    path: '**',
    component: NotFoundComponent,  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

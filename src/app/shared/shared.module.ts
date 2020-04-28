import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BasketComponent } from './basket/basket.component';
import { DishComponent } from './dish/dish.component';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PipeModule } from '../pipes/pipe.module';
import { ConditionsComponent } from './conditions/conditions.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';


const comp: any = [
  LoginComponent,
  SignUpComponent,
  BasketComponent,
  CategoryComponent,
]

@NgModule({
  declarations: [...comp, NotFoundComponent, DishComponent, ConditionsComponent],
  exports: [...comp],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    PipeModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    RouterModule
  ]
})

export class SharedModule { }

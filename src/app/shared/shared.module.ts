import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BasketComponent } from './basket/basket.component';
import { DishComponent } from './dish/dish.component';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PipeModule } from '../pipes/pipe.module';

const comp: any = [
  LoginComponent,
  SignUpComponent,
  BasketComponent,
  CategoryComponent,
]

@NgModule({
  declarations: [...comp, NotFoundComponent, DishComponent],
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
    MatCardModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { NavListComponent } from './nav-list/nav-list.component';


const componets: any = [
  HeaderComponent,
  LayoutComponent,
  NavListComponent,
]

@NgModule({
  declarations: [...componets],
  exports: [...componets],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTooltipModule,
  ]
})
export class CoreModule { }

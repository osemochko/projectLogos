import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public opened: boolean;
  public sideMode: string;

  constructor() { 
    this.opened = true;
    this.sideMode = 'side';
  }

  ngOnInit() {
  }
  
  public toggleSideNav(): void {
      this.opened = !this.opened;
  }
  
}

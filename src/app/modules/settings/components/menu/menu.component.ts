import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'az-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor(private router: Router) { }

  public navigateTo(urlSegment: string): void {
    this.router.navigate([urlSegment]);
  }
}

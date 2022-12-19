import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'az-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor(private navController: NavController) { }

  public navigateTo(urlSegment: string): void {
    this.navController.navigateForward(urlSegment);
  }
}

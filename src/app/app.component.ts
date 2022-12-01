import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'az-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'autorun-pwa';

  constructor(private router: Router) {}
}

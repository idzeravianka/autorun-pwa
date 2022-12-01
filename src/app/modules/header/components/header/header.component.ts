import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, skip } from 'rxjs';

@Component({
  selector: 'az-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isSettingsOpen$: Observable<boolean> = this.router.events.pipe(
    skip(1),
    filter((event) => event instanceof NavigationEnd),
    map((event: any) => event.url.includes('settings')),
  );

  constructor(private router: Router) { }

  public ngOnInit(): void {
  }

}

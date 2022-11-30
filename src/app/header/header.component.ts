import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, filter, map, Observable, skip, takeUntil } from 'rxjs';

import { AutoCloseable } from '../core/classes/auto-closable';
import { MqttService } from '../core/services/mqtt.service';

@Component({
  selector: 'az-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoCloseable implements OnInit {
  public isSettingsOpen$: Observable<boolean> = this.router.events.pipe(
    skip(1),
    filter((event) => event instanceof NavigationEnd),
    map((event: any) => event.url.includes('settings')),
  );
  public isCoreRoute$: Observable<boolean> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event: any) => event.url === '/' || event.url.includes('home')),
  );
  public isEditDashboardModeEnabled$: BehaviorSubject<boolean> = this.mqttService.isEditDashboardModeEnabled$;

  private navigationHistory: string[] = [];

  constructor(private router: Router, private location: Location, private navController: NavController, private mqttService: MqttService) {
    super();
  }

  public ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.destroyedSource),
    ).subscribe(event => {
      if (event instanceof NavigationEnd) this.navigationHistory.push(event.urlAfterRedirects);
    });
  }

  public navigateToSettings(): void {
    this.navController.navigateForward('/settings');
  }

  public navigationBack(): void {
    this.navController.setDirection('back');
    this.navigationHistory.pop();
    if (this.navigationHistory.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  public switchDashboardEditMode(): void {
    if (this.isEditDashboardModeEnabled$.value) {
      this.mqttService.saveDashboardElementsSettings();
    }
    this.mqttService.toggleDashboardEditMode();
  }

}

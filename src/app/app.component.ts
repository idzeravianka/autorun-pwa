import { AsyncPipe, CommonModule, Location } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonContent,
  IonBackButton,
  IonIcon,
  NavController,
} from '@ionic/angular/standalone';
import { filter, map, Observable, skip } from 'rxjs';

import { MqttService } from './core/services/mqtt.service';

@Component({
  selector: 'az-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonHeader,
    IonContent,
    AsyncPipe,
    RouterLinkActive,
    CommonModule,
    IonBackButton,
    IonIcon,
  ],
  host: {
    '(document:visibilitychange)': 'onVisibilityChange()',
  },
})
export class AppComponent implements OnInit {
  public isSettingsOpen$: Observable<boolean>;
  public isCoreRoute$: Observable<boolean>;
  public isEditDashboardModeEnabled: Signal<boolean>;

  private navigationHistory: string[] = [];

  private destroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private location: Location = inject(Location);
  private navController: NavController = inject(NavController);
  private mqttService: MqttService = inject(MqttService);

  constructor() {
    this.isSettingsOpen$ = this.router.events.pipe(
      skip(1),
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url.includes('settings')),
    );
    this.isCoreRoute$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url === '/' || event.url.includes('home')),
    );

    this.isEditDashboardModeEnabled = this.mqttService.isEditDashboardModeEnabled;
  }

  ngOnInit() {
    // this.newVersionPromptService.checkAppVersion();
    this.mqttService.setDashboardElementsSettings();
    this.mqttService.listenInternetConnection();
    if (this.mqttService.hasInternetConnection()) {
      this.mqttService.connect();
    }
    this.mqttService.setTimerData();

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationEnd) this.navigationHistory.push(event.urlAfterRedirects);
    });
  }

  public onVisibilityChange(): void {
    if (document.visibilityState === 'visible') {
      this.mqttService.updateSensorsData();
    }
  }

  public async navigateToSettings(): Promise<void> {
    await this.navController.navigateForward('/settings');
  }

  public async navigationBack(): Promise<void> {
    this.navController.setDirection('back');
    this.navigationHistory.pop();
    if (this.navigationHistory.length > 0) {
      this.location.back();
    } else {
      await this.router.navigateByUrl('/');
    }
  }

  public switchDashboardEditMode(): void {
    if (this.isEditDashboardModeEnabled()) {
      this.mqttService.saveDashboardElementsSettings();
    }
    this.mqttService.toggleDashboardEditMode();
  }
}

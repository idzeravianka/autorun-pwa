import { CommonModule, Location } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { filter, map, Observable, skip } from 'rxjs';

import { MqttService } from '../../services/mqtt.service';

@Component({
  selector: 'az-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterLinkActive, IonicModule],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  public isSettingsOpen$: Observable<boolean> = this.router.events.pipe(
    skip(1),
    filter((event) => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url.includes('settings')),
  );
  public isCoreRoute$: Observable<boolean> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url === '/' || event.url.includes('home')),
  );
  public isEditDashboardModeEnabled: Signal<boolean> = this.mqttService.isEditDashboardModeEnabled;

  private navigationHistory: string[] = [];

  private destroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private location: Location = inject(Location);
  private navController: NavController = inject(NavController);
  private mqttService: MqttService = inject(MqttService);

  public ngOnInit(): void {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationEnd) this.navigationHistory.push(event.urlAfterRedirects);
    });
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

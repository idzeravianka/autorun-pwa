import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { take, timer } from 'rxjs';

import { PormptComponent } from '../components/pormpt/pormpt.component';

@Injectable({
  providedIn: 'root',
})
export class PwaPromptService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform,
  ) { }

  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      // @ts-ignore
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    const debounce = 3000;
    timer(debounce)
      .pipe(take(1))
      .subscribe(() => this.bottomSheet.open(PormptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }
}

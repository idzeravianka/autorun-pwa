import { Component, OnInit } from '@angular/core';

import { slideInOutAnimation } from '../../../../core/animations/slide-in-out';

@Component({
  selector: 'az-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
})
export class SettingsComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {
  }

}

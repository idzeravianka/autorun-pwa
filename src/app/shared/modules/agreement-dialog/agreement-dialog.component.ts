import { Component } from '@angular/core';

@Component({
  selector: 'az-agreement-dialog',
  templateUrl: './agreement-dialog.component.html',
  styleUrls: ['./agreement-dialog.component.scss'],
})
export class AgreementDialogComponent {
  public title: string;
  public agreementText: string;
  public agreeBtnText: string;
  public cancelBtnText: string;

  constructor() { }
}

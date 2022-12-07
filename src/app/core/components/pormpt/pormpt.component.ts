import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'az-pormpt',
  templateUrl: './pormpt.component.html',
  styleUrls: ['./pormpt.component.scss'],
})
export class PormptComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { mobileType: 'ios' | 'android'; promptEvent?: any },
    private bottomSheetRef: MatBottomSheetRef<PormptComponent>,
  ) {}

  public installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  public close() {
    this.bottomSheetRef.dismiss();
  }
}

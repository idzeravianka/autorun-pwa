import { MatDialogConfig } from '@angular/material/dialog';

export const matDialogConfig: MatDialogConfig = {
  ...new MatDialogConfig(),
  disableClose: true,
  autoFocus: false,
  restoreFocus: false,
};

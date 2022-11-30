import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { filter, Observable, of, startWith, switchMap, takeUntil } from 'rxjs';

import { AutoCloseable } from '../../../core/classes/auto-closable';

const ERROR_MESSAGES: { [key: string]: string } = {
  pattern: 'Неверный формат',
  required: 'Поле обязательно для заполнения',
};

@Pipe({
  name: 'getErrorText',
})
export class GetErrorText extends AutoCloseable implements PipeTransform {
  public transform(value: string | null, control: AbstractControl): Observable<string> {
    return control.statusChanges
      .pipe(
        startWith(control.status),
        filter(status => status === 'INVALID'),
        switchMap(() => {
          if (!control.pristine && !control.errors) return of('');

          const errorKey = control.errors && Object.keys(control.errors)[0] || '';
          const keyForMessageSelect = value ? `${value}-${errorKey}` : errorKey;

          return of(ERROR_MESSAGES[keyForMessageSelect] || '');
        }),
        takeUntil(this.destroyedSource),
      );
  }
}

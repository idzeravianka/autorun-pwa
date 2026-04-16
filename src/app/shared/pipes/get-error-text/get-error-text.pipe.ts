import { DestroyRef, inject, Pipe, PipeTransform } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { filter, Observable, of, startWith, switchMap } from 'rxjs';

const ERROR_MESSAGES: Record<string, string> = {
  pattern: 'Неверный формат',
  required: 'Поле обязательно для заполнения',
};

@Pipe({
  name: 'getErrorText',
  standalone: true,
})
export class GetErrorText implements PipeTransform {
  private destroyRef = inject(DestroyRef);

  public transform(value: string, control: AbstractControl): Observable<string> {
    return control.statusChanges.pipe(
      startWith(control.status),
      filter((status) => status === 'INVALID'),
      switchMap(() => {
        if (!control.pristine && !control.errors) return of('');

        const errorKey = (control.errors && Object.keys(control.errors)[0]) ?? '';
        const keyForMessageSelect = value ? `${value}-${errorKey}` : errorKey;

        return of(ERROR_MESSAGES[keyForMessageSelect] ?? '');
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }
}

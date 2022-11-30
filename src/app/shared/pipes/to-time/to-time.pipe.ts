/* eslint-disable no-magic-numbers */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTime',
})
export class ToTimePipe implements PipeTransform {
  public transform(value: number | null): string {
    return value ? new Date(value * 1000).toISOString().substring(14, 19) : '--.--';
  }
}

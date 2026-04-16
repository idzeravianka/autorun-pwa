import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CircleProgressComponent, NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  selector: 'az-hold-button',
  templateUrl: './hold-button.component.html',
  styleUrls: ['./hold-button.component.scss'],
  imports: [CommonModule, IonicModule, NgCircleProgressModule],
  standalone: true,
})
export class HoldButtonComponent {
  @Input() disabled: boolean;
  @Input() isLoading: boolean;
  @Input() holdTime: number;
  @Input() iconUrl: string;

  @Output() holdTimeEnd: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild('progressbar') progressBarEl: CircleProgressComponent;

  public isButtonPressed: boolean;

  private pressedTimerId: ReturnType<typeof setTimeout> | undefined;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public onStartStopPressed(e: Event): void {
    if (e.cancelable) e.preventDefault();
    if (this.disabled) return;
    if (this.holdTime === 0) {
      this.holdTimeEnd.emit();
      return;
    }
    const multiplier = 1000;
    this.isButtonPressed = true;
    this.cdr.detectChanges();
    this.pressedTimerId = setTimeout(() => {
      this.holdTimeEnd.emit();
      this.isButtonPressed = false;
      clearTimeout(this.pressedTimerId);
    }, this.holdTime * multiplier);
  }

  public onStartStopUnPressed(e: Event): void {
    if (e.cancelable) e.preventDefault();
    this.isButtonPressed = false;
    clearTimeout(this.pressedTimerId);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'az-hold-button',
  templateUrl: './hold-button.component.html',
  styleUrls: ['./hold-button.component.scss'],
})
export class HoldButtonComponent {
  @Input() disabled: boolean;
  @Input() isLoading: boolean;
  @Input() holdTime: number;
  @Input() iconUrl: string;

  @Output() holdTimeEnd: EventEmitter<null> = new EventEmitter<null>();

  public isButtonPressed: boolean;

  private pressedTimerId: any;

  public onStartStopPressed(e: Event): void {
    if (e.cancelable) e.preventDefault();
    if (this.disabled) return;
    if (this.holdTime === 0) {
      this.holdTimeEnd.emit();
      return;
    }
    const multiplier = 1000;
    this.isButtonPressed = true;
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

import { Component, EventEmitter, Input, Output } from '@angular/core';

const PROGRESS_TIMER = 30;
const PROGRESS_ANIMATION_TIME = 200;

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

  public progressPercent: number = 0;

  private progressTimer: number = PROGRESS_TIMER;
  private progressTimerId: any;
  private pressedTimerId: any;

  public onStartStopPressed(e: Event): void {
    if (e.cancelable) e.preventDefault();
    if (this.disabled) return;
    this.progressTimerId = setInterval(() => {
      this.progressPercent += this.calculateIncrement();
    }, this.progressTimer);
    this.pressedTimerId = setTimeout(() => {
      this.holdTimeEnd.emit();
      this.clearIntervals();
    }, this.holdTime + PROGRESS_ANIMATION_TIME);
  }

  public onStartStopUnPressed(e: Event): void {
    if (e.cancelable) e.preventDefault();
    this.clearIntervals();
  }

  private clearIntervals(): void {
    clearInterval(this.progressTimerId);
    clearTimeout(this.pressedTimerId);
    this.progressPercent = 0;
  }

  private calculateIncrement(): number {
    const fullLoaderPercent = 100;
    return (this.progressTimer * fullLoaderPercent) / this.holdTime;
  }
}

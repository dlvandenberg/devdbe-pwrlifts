import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  @Input()
  public message: string;

  @Input()
  public show: boolean;

  @Output()
  public dismiss = new EventEmitter();
}

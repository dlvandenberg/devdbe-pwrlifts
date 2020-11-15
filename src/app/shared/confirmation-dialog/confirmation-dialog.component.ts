import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  @Input()
  public title: string;

  @Input()
  public confirmDisabled = false;

  @Input()
  public confirmButtonText = 'Save';

  @Output()
  public cancel = new EventEmitter<null>();

  @Output()
  public confirm = new EventEmitter<null>();
}

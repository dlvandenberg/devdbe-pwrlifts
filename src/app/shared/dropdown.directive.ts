import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdown'
})
export class DropdownDirective {
  public isOpen = false;

  @HostListener('document:click', ['$event'])
  public handleClickEvent(event: Event): void {
      this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) {}
}

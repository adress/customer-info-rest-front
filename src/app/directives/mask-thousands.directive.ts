import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMaskThousands]',
  standalone: true,
})
export class MaskThousandsDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl: NgControl //access to the formControl
  ) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const rawValue = value.replace(/[^0-9]/g, '');
    const formattedValue = this.formatThousands(rawValue);

    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(rawValue, { emitEvent: false });  //update formControl
    }
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue); //update input
  }

  private formatThousands(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

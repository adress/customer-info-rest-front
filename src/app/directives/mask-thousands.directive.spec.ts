import { MaskThousandsDirective } from './mask-thousands.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

describe('MaskThousandsDirective', () => {
  let directive: MaskThousandsDirective;
  let elRefMock: ElementRef;
  let rendererMock: Renderer2;
  let ngControlMock: NgControl;

  beforeEach(() => {
    elRefMock = { nativeElement: document.createElement('input') };
    rendererMock = {
      setProperty: jest.fn(),
    } as unknown as Renderer2;
    ngControlMock = {
      control: {
        setValue: jest.fn(),
      },
    } as unknown as NgControl;

    directive = new MaskThousandsDirective(elRefMock, rendererMock, ngControlMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should format input value with thousands separator', () => {
    const input = '1234567';
    directive.onInput(input);

    expect(rendererMock.setProperty).toHaveBeenCalledWith(elRefMock.nativeElement, 'value', '1,234,567');
    expect(ngControlMock.control?.setValue).toHaveBeenCalledWith('1234567', { emitEvent: false });
  });

  it('should remove non-numeric characters from input value', () => {
    const input = '1a2b3c4d5e6f7g';
    directive.onInput(input);

    expect(rendererMock.setProperty).toHaveBeenCalledWith(elRefMock.nativeElement, 'value', '1,234,567');
    expect(ngControlMock.control?.setValue).toHaveBeenCalledWith('1234567', { emitEvent: false });
  });
});

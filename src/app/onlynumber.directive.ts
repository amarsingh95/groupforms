import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlynumber]'
})
export class OnlynumberDirective {

  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  inputElement: HTMLElement;
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    let index = (e.target as HTMLInputElement)?.value?.indexOf('.');
    if (e.key === '.' && index > -1) {
      e.preventDefault();
    }
    else {
      if (
        this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
        (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
        (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
        (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
        (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
        (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
        (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
        (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
        (e.key === 'x' && e.metaKey === true) ||// Allow: Cmd+X (Mac)
        (e.key === 'z' && e.ctrlKey === true) || // Allow: Ctrl+Z
        (e.key === 'z' && e.metaKey === true) // Allow: Cmd+X (Mac)
        || (e.keyCode === 110 || e.keyCode === 190 || e.keyCode === 46)
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    let value: any =  event.clipboardData?.getData('Text');
    if (!value?.match(/^(\d+)?([.]?\d{0,2})?$/)) {
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    let value: any =  event.dataTransfer?.getData('Text')
    if (!value?.match(/^(\d+)?([.]?\d{0,2})?$/)) {
      event.preventDefault();
    }
  }


}
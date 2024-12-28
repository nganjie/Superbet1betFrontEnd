import { HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

export class NumberOnlyDirective {
    private el: HTMLInputElement;

    constructor(private element: HTMLInputElement) {
        this.el = element;
    }
    // Listen for the input event to also handle copy and paste.
    @HostListener('input', ['$event.target.value'])
    onInput(value: string): void {
        // Use NgControl patchValue to prevent the issue on validation
        this.el.value = value.replace(/[^0-9]/g, '');
    }
}

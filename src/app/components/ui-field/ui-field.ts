import { Component, effect, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-ui-field',
  imports: [],
  templateUrl: './ui-field.html',
  styleUrl: './ui-field.scss',
})
export class UiField {
  value = input.required<string>();
  class = input<'green' | 'red' | 'warning' | 'gray' | 'orange' | 'primary' | 'undefined'>();

  mainElement = viewChild<ElementRef>('uiField');

  constructor() {
    effect(() => {
      const classValue = this.class();
      if (classValue) {
        this.mainElement()!.nativeElement.classList.add(classValue);
      }
    });
  }
}

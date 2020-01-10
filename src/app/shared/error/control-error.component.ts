import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  template: `
    <span class="text-red-500 text-sm" [class.hidden]="_hide">
          {{_text}}
      </span>
  `,
  styles: []
})
export class ControlErrorComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  _text: string | null = null;
  // tslint:disable-next-line:variable-name
  _hide = true;

  @Input() set text(value: string | null) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

}

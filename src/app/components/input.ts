import { Component, Inject, Injector, Input, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { animations, ElementBase } from '../form';

@Component({
  selector: 'form-text',
  template: `
    <div>
      <label *ngIf="label" [attr.for]="identifier">{{label}}</label>
      <input
        type="text"        
        [placeholder]="placeholder"
        [(ngModel)]="value"
        [disabled]="disabled"
        [ngClass]="{invalid: (invalid | async)}"
        [id]="identifier"
      />
      <validation
        [@flyInOut]="'in,out'"
        *ngIf="(invalid | async) && !disabled"
        [messages]="failures | async">
      </validation>
    </div>
  `,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormTextComponent,
    multi: true,
  }],
  host: {
    '[attr.disabled]': 'disabled'
  }
})
export class FormTextComponent extends ElementBase<string> {
  private _disabled: boolean;

  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() get disabled() {
    return this.control ? this.control.disabled : this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }

  @ViewChild(NgModel) model: NgModel;

  public identifier = `form-text-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    injector: Injector
  ) {
    super(validators, asyncValidators, injector);
  }

}

let identifier = 0;
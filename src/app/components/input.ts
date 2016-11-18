import {
  Component,
  Optional,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {Observable} from 'rxjs';

import {ValueAccessorBase} from './value-accessor';

import {validate} from './validate';

@Component({
  selector: 'form-text',
  template: `
    <div class="container">
      <input
        type="text"
        [(ngModel)]="value"
        [ngClass]="{
          invalid: (invalid | async),
          valid: !(invalid | async)
        }"
      />
      <validation-messages *ngIf="invalid | async"
        [messages]="failures | async">
      </validation-messages>
    </div>
  `,
  styles: [
    require('./input.scss'),
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: FormTextComponent, multi: true },
  ],
})
export class FormTextComponent extends ValueAccessorBase<string> {
  @ViewChild(NgModel) protected model: NgModel;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) private validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) private asyncValidators: Array<any>,
  ) {
    super();
  }

  private get invalid(): Observable<boolean> {
    return validate
        (this.validators, this.asyncValidators)
        (this.model.control)
      .map(v => Object.keys(v || {}).length > 0);
  }

  private get failures(): Observable<Array<string>> {
    return validate
        (this.validators, this.asyncValidators)
        (this.model.control)
      .map(v => {
        const array = new Array<string>();

        for (const key of Object.keys(v)) {
          array.push(this.failureMessage(v, key));
        }

        return array;
      });
  }

  private failureMessage(validator: {[validator: string]: any}, key: string): string {
    switch (key) {
      case 'required':
        return 'Please enter a value';
      case 'pattern':
        return 'Value does not match required pattern';
      case 'minlength':
        return 'Value must be N characters';
      case 'maxlength':
        return 'Value must be a maximum of N characters';
    }
    return validator[key];
  }
}
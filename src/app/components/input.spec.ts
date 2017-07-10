import { Component, ViewChild } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppModule } from '../app.module';
import { validateHexadecimal } from '../validators';
import { FormTextComponent } from './input';

describe('FormInput component', () => {
  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        FormInputHarnessNgModel,
        FormInputHarnessReactive
      ],
    });

    TestBed.compileComponents().then(done);
  });

  it('should apply an "invalid" class when validation fails on ngModel and print a validation failure message',
    async(() => {
      const fixture = TestBed.createComponent(FormInputHarnessNgModel);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const element = fixture.debugElement.nativeElement;

        Object.assign(fixture.componentInstance.formInput.model.control, { _touched: true });
        fixture.detectChanges();

        const input = element.querySelector('input');
        expect(Array.prototype.indexOf.call(input.classList, 'invalid')).not.toBe(-1);

        const failureMessage = element.querySelector('.validation');
        expect(failureMessage).not.toBeNull();
        expect(failureMessage.textContent.trim()).toBe('Please enter a value');
      });
    }));

  it('should apply an "invalid" class when validaion failed with a reactive form',
    async(() => {
      const fixture = TestBed.createComponent(FormInputHarnessReactive);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const element = fixture.debugElement.nativeElement;
        const form = fixture.componentInstance.form;

        form.get('hexadecimalValue').setValue('@#$');
        fixture.detectChanges();

        const input = element.querySelector('input');
        expect(Array.prototype.indexOf.call(input.classList, 'invalid')).not.toBe(-1);

        const failureMessage = element.querySelector('.validation');
        expect(failureMessage).not.toBeNull();
        expect(failureMessage.textContent.trim()).toBe('Please enter a hexadecimal value (alphanumeric, 0-9 and A-F)');
      });
    }));

  it('should apply an "invalid" class and show multiple errors when multiple validations fail',
    async(() => {
      const fixture = TestBed.createComponent(FormInputHarnessReactive);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const element = fixture.debugElement.nativeElement;
        const form = fixture.componentInstance.form;

        form.get('hexadecimalValue').setValue('@123123123123');
        fixture.detectChanges();

        const input = element.querySelector('input');
        expect(Array.prototype.indexOf.call(input.classList, 'invalid')).not.toBe(-1);

        const failureMessage = element.querySelector('.validation');
        expect(failureMessage).not.toBeNull();
        const errorMessages = failureMessage.textContent.trim();
        expect(errorMessages).toContain('Please enter a hexadecimal value (alphanumeric, 0-9 and A-F)');
        expect(errorMessages).toContain('Value must be a maximum of 10 characters');
      });
    }));


});

@Component({
  selector: 'form-input-container',
  template: `
    <form-text [(ngModel)]="text" required></form-text>
  `
})
export class FormInputHarnessNgModel {
  @ViewChild(FormTextComponent) formInput;
}

@Component({
  selector: 'form-input-container',
  template: `
    <form [formGroup]="form">
      <form-text formControlName="hexadecimalValue"></form-text>
    </form>
  `
})
export class FormInputHarnessReactive {
  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      'hexadecimalValue': ['', [validateHexadecimal(), Validators.maxLength(10)]]
    });
  }
}
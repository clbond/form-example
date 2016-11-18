import { TestBed, async, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormTextComponent } from './input';

import { AppModule } from '../app.module';

describe('FormInput component', () => {
  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        FormInputHarness,
      ],
    });

    TestBed.compileComponents().then(done);
  });

  it('should apply an "invalid" class when validation fails and print a validation failure message',
    async(() => {
      const fixture = TestBed.createComponent(FormInputHarness);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const element = fixture.debugElement.nativeElement;

        Object.assign(fixture.componentInstance.formInput.model.control, {_touched: true});
        fixture.detectChanges();

        const input = element.querySelector('input');
        expect(Array.prototype.indexOf.call(input.classList, 'invalid')).not.toBe(-1);

        const failureMessage = element.querySelector('.requirements');
        expect(failureMessage).not.toBeNull();
        expect(failureMessage.textContent.trim()).toBe('Please enter a value');
      });
    }));
});

@Component({
  selector: 'form-input-container',
  template: `
    <form-text [(ngModel)]="text" required></form-text>
  `
})
export class FormInputHarness {
  @ViewChild(FormTextComponent) formInput;
}
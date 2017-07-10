import { Injector, Component } from '@angular/core';
import { ControlValueAccessor, NgControl, NgModel, FormControl } from '@angular/forms';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;

  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();

  private _control: NgControl;

  /**
   * The control (NgModel or FormControl) that exists on our custom component.
   * Lazy loaded.
   * @readonly
   * @protected
   * @type {NgControl}
   * @memberof ValueAccessorBase
   */
  protected get control(): NgControl {
    if (this._control != null) {
      return this._control;
    }

    this._control = this._injector.get(NgControl, null).control;
    return this._control;
  }

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  constructor(private _injector: Injector) { }

  writeValue(value: T) {
    //this.parentControl = this._injector.get(NgControl, null);
    this.innerValue = value;
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }

  touch() {
    this.touched.forEach(f => f());
  }
}
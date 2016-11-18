import {
  AbstractControl,
  AsyncValidatorFn,
  Validator,
  Validators,
  ValidatorFn,
} from '@angular/forms';

import { Observable } from 'rxjs';

export type AsyncValidator = Validator | AsyncValidatorFn;

export type SyncValidator = Validator | ValidatorFn;

export type AsyncValidatorArray = Array<Validator | AsyncValidatorFn>;

export type ValidatorArray = Array<Validator | ValidatorFn>;

const normalizeValidator = (validator: SyncValidator): ValidatorFn => {
  if (typeof (<Validator> validator).validate === 'function') {
    return (c: AbstractControl) => (<Validator> validator).validate(c);
  } else {
    return <ValidatorFn> validator;
  }
};

const normalizeAsyncValidator =
    (validator: AsyncValidator): AsyncValidatorFn => {
  if (typeof (<Validator> validator).validate === 'function') {
    return (c: AbstractControl) => (<Validator> validator).validate(c);
  } else {
    return <AsyncValidatorFn> validator;
  }
};

export const composeValidators = (validators: ValidatorArray): ValidatorFn => {
  if (validators == null || validators.length === 0) {
    return null;
  }
  return Validators.compose(validators.map(normalizeValidator));
};

export const composeAsyncValidators =
    (validators: AsyncValidatorArray): AsyncValidatorFn => {
  if (validators == null || validators.length === 0) {
    return null;
  }
  return Validators.composeAsync(validators.map(normalizeAsyncValidator));
};

export const validate =
    (validators: ValidatorArray, asyncValidators: AsyncValidatorArray) => {
  return (control: AbstractControl) => {
    const synchronousValid = () => composeValidators(validators)(control);

    if (asyncValidators) {
      const asyncValidator = composeAsyncValidators(asyncValidators);

      return asyncValidator(control).map(v => {
        const s = synchronousValid(); // both validator styles
        if (s || v) {
          return Object.assign({}, s, v);
        }
      });
    }

    if (validators) {
      return Observable.of(synchronousValid());
    }

    return Observable.of(null);
  };
};

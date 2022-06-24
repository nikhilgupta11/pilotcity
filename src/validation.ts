import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
// eslint-disable-next-line camelcase
import { required, email, min, regex, numeric, min_value, max } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'This is not a valid email'
});
extend('password', {
  params: ['target'],
  validate(value, params: Record<string, any>) {
    return value === params.target;
  },
  message: 'Keep trekkin, almost there.'
});
extend('min', {
  ...min,
  message(value, args) {
    return `Must have at least ${args.length} characters`;
  }
});
extend('min_value', {
  // eslint-disable-next-line camelcase
  ...min_value,
  message(value) {
    return `Value must be at least ${value}`;
  }
});
extend('max', {
  ...max,
  message(value, args) {
    return `Must have at least ${args.length} characters`;
  }
});
extend('regex', {
  ...regex,

  message: 'Must be a Valid URL'
});
extend('numeric', {
  ...numeric,

  message: 'Must be a number'
});
export { ValidationObserver, ValidationProvider };

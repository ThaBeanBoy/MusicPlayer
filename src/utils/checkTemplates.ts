import validator from 'validator';
import { inputCheckType } from '../components/input';

export const requiredCheck: inputCheckType = {
  message: 'Value cannot be empty',
  check(input) {
    return input === '';
  },
};

export const emailCheck: inputCheckType = {
  message: 'Value should be an email',
  check(input) {
    return !validator.isEmail(input);
  },
};

export const passwordChecks: inputCheckType[] = [
  // minimum length
  {
    message: 'Password needs to be atleast 14 characters long',
    check(input) {
      return input.length < 14;
    },
  },

  // capital letters
  {
    message: 'Requires atleast 1 capital letter',
    check(input) {
      return !/[A-Z]/.test(input);
    },
  },

  // numbers
  {
    message: 'Requires atleast 1 specail character eg: []!@#$%^&*(),.?":{}|<>',
    check(input) {
      return !/[!@#$%^&*(),.?":{}|<>]/.test(input);
    },
  },

  // special characters
  {
    message: 'Requires atleast 1 number',
    check(input) {
      return !/\d/.test(input);
    },
  },
];

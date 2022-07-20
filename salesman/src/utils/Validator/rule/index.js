export const DEFAULT_RULE = {
  isRequired: true,
};
export const PASSWORD_RULE = {
  isRequired: true,
  minLength: 6,
};
export const OTP_RULE = {
  isRequired: true,
  minLength: 6,
};

export const NAME_RULE = {
  isRequired: true,
  minLength: 3,
  isName: true,
};
export const EMAIL_RULE = {
  isRequired: true,
  isEmail: true,
};

const createStringifiedUrl = (urlLink, params) => {
  if (!urlLink || urlLink.trim() === "") return undefined;

  // if params is not provided, is not an object, or is an empty object
  if (!params || typeof params !== "object" || Object.keys(params).length === 0)
    return urlLink;

  // If urlLink and params are provided, then stringified URL with sorted query params
  const sortedParams = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});

  return `${urlLink}?${new URLSearchParams(sortedParams).toString()}`;
};

const required = (value) => (value ? undefined : "This field is required");

const emailRegex = /\S+@\S+\.\S+/;
const emailValidator = (email) => {
  return emailRegex.test(email);
};

const validateEmail = (value) =>
  emailValidator(value) || !value ? undefined : "Enter a valid email address";

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const validateConfirmationPassword = (values) => {
  const errors = {};
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "Must match password field";
    return errors;
  }
};

const capitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// const getUserInitials = (user) => {
//   // @todo auth reducer initial user should be undefined
//   // and then set on current_user fetch or null if user not logged in
//   if (!user) return " ";

//   return `${capitalize(user.firstName[0])()}${capitalize(user.lastName[0])}`;
// };

export {
  required,
  capitalize,
  validateEmail,
  emailValidator,
  // getUserInitials,
  composeValidators,
  createStringifiedUrl,
  validateConfirmationPassword,
};

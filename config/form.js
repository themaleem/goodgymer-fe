const FORM_SUBSCRIPTION = {
  errors: true,
  invalid: true,
  submitting: true,
  hasValidationErrors: true,
};

const FORM_WITH_VALUES = {
  ...FORM_SUBSCRIPTION,
  values: true,
};

const FORM_WITH_DIRTY_VALUES = {
  ...FORM_WITH_VALUES,
  dirty: true,
};

export { FORM_WITH_VALUES, FORM_SUBSCRIPTION, FORM_WITH_DIRTY_VALUES };

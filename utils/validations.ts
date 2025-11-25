export const validateMonths = (value: number | undefined) => {
  if (value === undefined || value === null || value < 1) {
    return "Time period must be at least 1 month";
  }
  return "";
};

export const validateNonNegative = (
  value: number | undefined,
  fieldName: string
) => {
  if (value === undefined || value === null) {
    return "";
  }
  if (value < 0) {
    return `${fieldName} cannot be negative`;
  }
  return "";
};

export const validateNonEmpty = (value: string | undefined) => {
  if (!value || value.trim() === "") {
    return "This field cannot be empty";
  }
  return "";
};

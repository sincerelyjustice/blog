export const gatherClasses = (...classNames) => {
  const trueNames = classNames.filter((className) => !!className);
  return trueNames.join(' ');
};

export const optionalClass = (className, condition) => {
  return condition ? className : '';
};

export const choiceClass = (class1, class2, choice) => {
  return choice ? class1 : class2;
};
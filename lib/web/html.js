export const getSelectedValue = (selectElement) => {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  return selectedOption.value;
};

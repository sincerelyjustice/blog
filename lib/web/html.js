export const getSelectedValue = (selectElement) => {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  console.log(selectedOption.value);
  console.log(selectedOption)
  return selectedOption.value;
};

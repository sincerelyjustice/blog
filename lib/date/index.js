const getCalendarDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB');
};

module.exports = { getCalendarDate };

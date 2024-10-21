export const getCurrentTerm = (terms) => {
  const currentDate = new Date();
  return terms.find((term) => {
    const startDate = new Date(term.startDate);
    const endDate = new Date(term.endDate);
    return currentDate >= startDate && currentDate <= endDate;
  });
};

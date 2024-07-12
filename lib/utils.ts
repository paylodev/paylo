const getMissingFields = (fields: string[], obj: any) => {
  return fields.filter((field) => !obj[field]);
};

export { getMissingFields };

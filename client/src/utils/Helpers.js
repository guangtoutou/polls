const formatDateTime = datetime => {
  const dt = new Date(datetime);
  return dt.toLocaleString();
};

export default formatDateTime;

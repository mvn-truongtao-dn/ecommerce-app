const getError = (error: any): any => {
  error.response && error.reponse.data && error.reponse.data.message
    ? error.response.data.massage
    : error.massage;
};
export { getError };

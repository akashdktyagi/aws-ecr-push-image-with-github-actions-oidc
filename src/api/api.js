import axios from 'axios'

export const defaultErrorHandler = error => {
  return Promise.reject(error);
};
export const errorHandler = error => {
  // if(error.response.status===500){
  //   localStorage.clear();
  //   localStorage.setItem("sessionExpired","sessionExpired")
  //   window.location.reload()
  // }
  return Promise.reject(error.response);
};

const getInitializedApi = (containType, responseType = 'json') => {
  let api = axios.create({
    // checksum: responseType.checksum,
    // datetime: responseType.datetime,
    headers : {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    },
  });
  return api;
};

export const convertToFormUrlencodedValue = params => {
  return Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');
};

export const post = (url, data, Header) => {
  return getInitializedApi('application/json', Header)
    .post(url, data, Header)
    .catch(errorHandler || defaultErrorHandler);
};
export const put = (url, data) => {
  return getInitializedApi('application/json')
    .put(url, data)
    .catch(errorHandler || defaultErrorHandler);
};
export const get = (url, data) => {
  return getInitializedApi('application/json')
    .get(url, data)
    .catch(errorHandler || defaultErrorHandler);
};
export const getDownloadData = (url, data,Header, config) => {
  return getInitializedApi('application/vnd.ms-excel', 'blob')
    .post(url, data, Header, config)
    .catch(errorHandler || defaultErrorHandler);
};
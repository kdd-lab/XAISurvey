import axios from 'axios';

// function prepareRequestParameters(obj) {
//   const params = new URLSearchParams();
//   Object.keys(obj).forEach((k) => {
//     params.append(k, obj[k]);
//   });
//
//   return params;
// }

const baseURL = 'https://kdd.isti.cnr.it/cre_api';
// baseURL = 'http://localhost:9992';
const instance = axios.create({
  baseURL,
  withCredentials: true,
  progress: true,
});


function getSingleEndpoint(parameters, endpoint) {
  // const params = {
  //   headers: {
  //     Authorization: 'Bearer {{my token here}}',
  //   }
  // }

  const options = {
    ...parameters,
  };

  const args = Object.entries(options)
    .map(d => `${d[0]}=${d[1]}`)
    .join('&');

  return instance.get(`/${endpoint}?${args}`);
}


export {
  instance,
  getSingleEndpoint,
};

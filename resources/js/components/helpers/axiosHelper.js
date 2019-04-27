export function getLoginConfig({ email, password }){

  //Data from the form
  const userData = { email, password };

  //create string for axios
  const axiosData = Object.keys(userData).map((key) =>( encodeURIComponent(key) + '=' + encodeURIComponent(userData[key]))).join('&');

  //assemble the Axios Config
  const loginConfig = {
    url: '/api/login',
    method: 'post',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    data: axiosData,
    responseType: 'json',
  }

  console.log('axios data', axiosData);
  console.log('login data', loginConfig);

  return loginConfig;

}

export function getLogoutConfig(token){

    //assemble the Axios Config with token
  return {
    url: '/api/logout',
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization' : 'Bearer ' + token},
    responseType: 'json',
  }


}

export function getMessagesConfig(token){

  console.log('token from helper', token);

  //assemble the Axios Config with token
  return {
    url: '/api/messages',
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization' : 'Bearer ' + token},
    responseType: 'json',
  }


}

export function storeNewMessageConfig(token, messageData){

  //create string for axios
  const axiosData = Object.keys(messageData).map((key) =>( encodeURIComponent(key) + '=' + encodeURIComponent(messageData[key]))).join('&');

  //assemble the Axios Config
  const newMessageConfig = {
    url: '/api/messages/new',
    method: 'post',
    headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization' : 'Bearer ' + token
              },
    data: axiosData,
    responseType: 'json',
  }

  console.log('axios data', axiosData);
  console.log('storeMessage data', newMessageConfig);

  return newMessageConfig;
}

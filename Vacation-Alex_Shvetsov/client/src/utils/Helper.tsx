

export const apiRequest = async (
  url: string,
  method: string,
  bodyParams?: string | object
): Promise<any> => {
  const response = await fetch(url, {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: bodyParams ? JSON.stringify(bodyParams) : undefined
  });
  return await response.json();
};


export const apiRequestWithImg = async (
  url: string,
  method: string,
  bodyParams?: any
): Promise<any> => {
  const response = await fetch(url, {
    mode: 'no-cors',
    method,
    body: bodyParams
  });
  return await response;
};
const mockStatusCode = () => (Math.random() > 0.5 ? 200 : undefined);

export const mockBody = {
  name: 'locio',
  email: 'jose4@autovist.com.br',
  phone: '11999887766',
  cep: '55192643'
};

export const makeFakeRequest = (): unknown => {
  const status = mockStatusCode();

  const fakeReq = {
    headers: {},
    body: mockBody,
    statusCode: status
  };

  return fakeReq;
};

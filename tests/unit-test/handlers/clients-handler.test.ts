import { Logger } from 'winston';
import { ClientsHandler } from '../../../src/handlers/http/clients-handler';
import { mock, mockDeep } from 'jest-mock-extended';
import { ClientService } from '../../../src/services';
import { Response, Request } from 'express';
import { mockBody } from '../utils/request-model-mock';

const mockResponse = () => {
  const statusResponse = mockDeep<Response>();
  const status = jest.fn().mockReturnValue(statusResponse);

  const response = mockDeep<Response>({
    status
  });

  return {
    response,
    statusResponse
  };
};

const makeSut = () => {
  const loggerMock = mock<Logger>();
  const serviceMock = mock<ClientService>();

  const { response: fakeRes } = mockResponse();
  const fakeReq = mock<Request>({
    body: mockBody
  });

  const sut = new ClientsHandler(loggerMock, serviceMock);
  return {
    sut,
    loggerMock,
    serviceMock,
    fakeRes,
    fakeReq
  };
};

describe('ClientsHandler', () => {
  test('Should return a user if create is success', async () => {
    const { sut, serviceMock, fakeReq, fakeRes } = makeSut();

    await sut.handle(fakeReq, fakeRes);

    expect(fakeRes.status).toBeCalledWith(200);
    expect(serviceMock.addClient).toHaveBeenCalled();
  });
});

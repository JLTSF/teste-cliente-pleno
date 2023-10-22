import { Logger } from 'winston';
import { ClientsHandler } from '../../../src/handlers/http/clients-handler';
import { mock, mockDeep } from 'jest-mock-extended';
import { ClientService } from '../../../src/services';
import { Response, Request } from 'express';
import { mockBody } from '../utils/request-model-mock';
import {
  ClientAlreadyExistsException,
  QueryLimitExceedsException
} from '../../../src/helpers/client-service-logs';

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
  describe('handle', () => {
    test('Should return a user if create is success', async () => {
      const { sut, serviceMock, fakeReq, fakeRes } = makeSut();

      await sut.handle(fakeReq, fakeRes);

      expect(fakeRes.status).toBeCalledWith(200);
      expect(serviceMock.addClient).toHaveBeenCalled();
    });

    test('Should log if throw a error from clientService', async () => {
      const { sut, serviceMock, fakeReq, fakeRes, loggerMock } = makeSut();

      serviceMock.addClient.mockRejectedValueOnce(new Error());

      await sut.handle(fakeReq, fakeRes);

      expect(fakeRes.status).not.toBeCalledWith(200);
      expect(loggerMock.error).toHaveBeenCalled();
    });

    test('Should log and set Status 400 if throw a error ClientAlreadyExistsException', async () => {
      const { sut, serviceMock, fakeReq, fakeRes, loggerMock } = makeSut();

      serviceMock.addClient.mockRejectedValueOnce(
        new ClientAlreadyExistsException()
      );

      await sut.handle(fakeReq, fakeRes);

      expect(fakeRes.status).toBeCalledWith(400);
      expect(loggerMock.error).toHaveBeenCalled();
    });

    test('Should log and set Status 500 if instanceof error is different of BaseException', async () => {
      const { sut, serviceMock, fakeReq, fakeRes, loggerMock } = makeSut();

      serviceMock.addClient.mockRejectedValueOnce(new Error());

      await sut.handle(fakeReq, fakeRes);

      expect(fakeRes.status).toBeCalledWith(500);
      expect(loggerMock.error).toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    test('Should return correct result if all params is correct', async () => {
      const { sut, serviceMock, fakeReq, fakeRes, loggerMock } = makeSut();

      const fakeBody = {
        count: 1,
        previus: null,
        nextPage: null,
        results: [
          {
            id: '65354875ba6541cb0e056607',
            name: 'jose'
          }
        ]
      };
      serviceMock.getAll.mockResolvedValueOnce(fakeBody);

      await sut.getAll(fakeReq, fakeRes);

      expect(fakeRes.send).toHaveBeenCalledWith(fakeBody);
    });

    test('Should log error if limit is more than limitMaxQuery', async () => {
      const { sut, serviceMock, fakeReq, fakeRes, loggerMock } = makeSut();

      serviceMock.getAll.mockRejectedValueOnce(
        new QueryLimitExceedsException()
      );

      await sut.getAll(fakeReq, fakeRes);

      expect(fakeRes.status).toHaveBeenCalledWith(400);
      expect(fakeRes.status(400).send).toHaveBeenCalledWith({
        error: 'The limit exceeded the maximum allowed'
      });
    });
  });
});

// import { Logger } from 'winston';
// import { ClientsHandler } from '../../../src/handlers/http/clients-handler';
// import { mock } from 'jest-mock-extended';
// import { ClientService } from '../../../src/services';
// import { Response } from 'express';

// const makeSut = () => {
//   const loggerMock = mock<Logger>();
//   const serviceMock = mock<ClientService>();

//   const ResponseMock = mock<Response>();
//   const RequestMock = mock<Request>();
//   const fakeReq = makeFakeRequest() as typeof RequestMock;

//   const fakeRes = (): typeof ResponseMock => {
//     const res = {} as Response;
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);

//     return res as typeof ResponseMock;
//   };

//   const sut = new ClientsHandler(loggerMock, serviceMock);
//   return {
//     sut,
//     loggerMock,
//     serviceMock,
//     fakeRes,
//     fakeReq
//   };
// };

// describe('ClientsHandler', () => {
//   test('Should return a user if create is success', async () => {
//     const { sut, requestMock, fakeRes } = makeSut();

//     await sut.handle(fakeReq, fakeRes);

//     expect(1 + 1).toBe(2);
//   });
// });

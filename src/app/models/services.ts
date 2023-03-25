export class AddService {
    constructor(
      public profileId: number,
      public serviceCategory: string,
      public serviceType: string,
      public serviceCaption: string,
      public serviceDescription: string,
      public serviceRate: number,
      public negotiable: boolean,
      public pictureImages: any[],
    ){}
  }

  export interface CommonResponse {
    responseCode: string;
    responseData: any;
    responseMsg: string;
  }

  export class DeleteService{
    constructor(
      public profileId: number,
      public serviceIds: number[]
    ){}
  }

  export class RegistrationPayment{
    constructor(
      public paymentGateway: string,
      public paymentReference: string,
      public paymentGatewayResponseCode: string,
      public paymentGatewayResponseMessage: string,
      public transactionSource: string,
      public supplierId: number,
      public serviceId: number,
      public amount: number
    ){}
  }
export class Services{
  constructor(
    public requestId: number,
    public serviceId: number,
    public quantity: number
  ){}
}
  export class RequestAction{
    constructor(
      public eventId: number,
      public supplierId: number,
      public services:Services[],
      public accept: boolean
    ){}
  }
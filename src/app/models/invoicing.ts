export class Invoicing{
    constructor(
      public inovieceNumber: string,
      public date: string,
      public recipientName: string,
      public email: string,
      public address: string,
      public isSent: boolean,
      public discount: number,
      public serviceDesriptionDetails: any[]
    ){}
  }

  export class InvoiceDetails{
    constructor(
        public serviceId: number,
        public rate: number
    ){}
  }
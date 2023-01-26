export class Invoicing{
    constructor(
      public invoiceId: string,
      public date: string,
      public recipientName: string,
      public email: string,
      public address: string,
      public isSent: boolean,
      public supplierInvoiceDetails: InvoiceDetails[]
    ){}
  }

  export class InvoiceDetails{
    constructor(
        public serviceId: number,
        public rate: number
    ){}
  }
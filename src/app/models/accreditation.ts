export class Accreditation {
    constructor(
      public profileId: number,
      public proofOfExistence: ProofOfExistence[],
      public paymentDetails: PaymentDetails
    ){}
  }

  export class BasicInfo {
    constructor(
        public firstName: string,
        public lastName: string,
        public dateOfBirth: string,
        public gender: string,
        public phoneNumber: string,
        public email: string
    ){}
  }

  export class SupplierLocation {
    constructor(
        public state: string,
        public lga: string,
        public address: string
    ){}
  }

  export class SupplierService {
    constructor(
        public name: string,
        public id: number
    ){}
  }

  export class ProofOfExistence {
    constructor(
        public documentCaption: string,
        public documentDescription: string,
        public documentFiles: string[]
    ){}
  }

  export class PaymentDetails {
    constructor(
        public amount: any,
        public transactionRef: string,
        public paymentGateway: string,
        public paymentStatus: string
    ){}
  }

  export class Payment{
    constructor(
      public profileId: string,
      public securityQuestion: string,
      public securityAnswer: string,
      public walletPin: string,
      public confirmPin:string,
      public amount:number,
      public platForm:string,
      public gateway:string

    ){}
  }

  export class CreateAccount{
    constructor(
      public profileId: number,
      public bvn: string,
      public bankCode: string,
      public bankName: string,
      public bankAccountNumber: string,
      public accountName: string
    ){}
  }

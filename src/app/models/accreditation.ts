export class Accreditation {
    constructor(
      public profileId: number,
      public basicInfo: BasicInfo,
      public supplierLocation: SupplierLocation,
      public supplierServices: SupplierService[],
      public proofOfExistence: ProofOfExistence,
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
        public amount: string,
        public transactionRef: string,
        public paymentGateway: string,
        public paymentStatus: string
    ){}
  }

  
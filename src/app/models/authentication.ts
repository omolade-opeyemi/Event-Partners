export class AccountLogin{
  constructor(
    public email: string,
    public password: string,
  ){}
}

export class individualAccount {

    constructor(
      public firstName: string,
      public lastName: string,
      public gender: string,
      public supplierCategoryId: number,  
      public dateOfBirth: string,
      public mobileNumber: string,
      public stateId: number,
      public state: string,
      public lgaId: number,
      public street: string,
      public address: string,
      public imageUrl:string,
      public primaryContactName: string,
      public primaryContactEmail: string,
      public primaryContactMobile: string,
      public primaryContactGender: string,
      public accountLogin: AccountLogin
    ) {  }
  
  }




export class createBussiness{
  constructor(
    public companyName: string,
    public industryId: number,
    public industry: string,
    public phoneNumber: string,
    public stateId: number,
    public lgaId: number,
    public address: string,
    public logoUrl: string,
    public email: string,
    public password: string,
    public password2: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public phoneNumber2: string,
    public gender: string
  ) { }
}
 
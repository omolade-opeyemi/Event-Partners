export class AccountLogin {
  constructor(
    public email: string,
    public password: string,
  ) { }
}

export class Login {
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
    public imageUrl: string,
    public primaryContactName: string,
    public primaryContactEmail: string,
    public primaryContactMobile: string,
    public primaryContactGender: string,
    public accountLogin: AccountLogin
  ) { }

}


export class CreateBussiness {
  constructor(
    public supplierName: string,
    public description: string,
    public supplierCategoryId: number,
    public mobileNumber: string,
    public stateId: number,
    public state: string,
    public lgaId: number,
    public street: string,
    public address: string,
    public imageUrl: string,
    public primaryContactName: string,
    public primaryContactEmail: string,
    public primaryContactMobile: string,
    public primaryContactGender: string,
    public accountLogin: AccountLogin
  ) { }
}

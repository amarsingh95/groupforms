export type multiSelectType={
    value: string,
    text: string,
    selected: boolean
  }
  
  
  export type University=
  {
    uname:string,
    department:Department[]
  }
  export type Department={
    dname:string,
    students:Student[]
  }
  
  export type Student={
    firstname:string,
    lastname:string,
    email:string,
    gender:string,
    country:string,
    topics:string,
    language:Language[],
    subject:Subject[]
    otp:otpValType[]
  }
  
  export type Subject ={
    subname:string 
  }
  
  export type Language={
      value:string,
      selected:boolean,
      touched:boolean
  }
  
  export type otpValType={
    value:string,
    text:string,
    touched:boolean 
   }

   export type valType={
    value: string,
    selected: boolean,
    touched: boolean
  }

  export type fileType=
  {
    albumId:number,
    id:number,
    thumbnailUrl:string,
    title:string,
    url:string
  }



  export type dropDownList={
    value:string,
    text:string,
    id?:string
  }
export interface AccountType {
    iss?:string;
    nbf?:number;
    aud?:string;
    sub?:string;
    email?:string;
    email_verified?:boolean;
    azp?:string;
    name?:string;
    picture?:string;
    given_name?:string;
    family_name?:string;
    iat?:number;
    exp?:number;
    jti?:string
}

export interface UserType {
    id: number;
    name: string;
    picture: string;
    online?: boolean;
    message?: MessageType;
    unViews?: number;
}

export interface MessageType {
    id: number;
    message: string;
    senderID: number;
    dialogID: number;
    isView: boolean,
    date: number;
}

export interface MessageContentType extends MessageType{
    picture: string;
    name: string;
}
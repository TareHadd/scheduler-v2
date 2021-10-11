export interface Data {
    data:{
        appointments: {
            nodes:[
                {
                    id: number,
                    date: string,
                    maxInviteeCount: number,
                    attendeeCount: number,
                    showContactInformation:boolean,
                    contact: Contact,
                    property: Property,
                    __typename: string
                }
            ],
            page: {
                cursor: number,
                hasNext: boolean,
                hasPrev: boolean,
                next: number,
                page: number,
                prev: number,
                size: number,
                totalElements: number,
                totalPages: number,
                __typename: string
            },
            __typename: string
        }
    }
} 


export interface Appointments {
    nodes: Node[],
    page: Page,
    __typename: string
}

export interface Page {
    cursor: number,
    hasNext: boolean,
    hasPrev: boolean,
    next: number,
    page: number,
    prev: number,
    size: number,
    totalElements: number,
    totalPages: number,
    __typename: string
}



export interface Node {
    id: number,
    date: string,
    maxInviteeCount: number,
    attendeeCount: number,
    showContactInformation:boolean,
    contact: Contact,
    property: Property,
    __typename: string
}

export interface Contact {
  firstName: string;
  name: string;
  email: string;
  mobile: string;
  phone: string;
  address: Address;
  fullName: string;
}

export interface Address{
    street: string;
    houseNumber: number;
    city: string;
    country: string;
    zipCode: string;
    __typename: string;
}

export interface Property{
    id: string,
    name: string,
    inviteeCount: number
    address: Address,
    attachments: Attachment[],
    user: User,
    __typename: string
}

export interface User{
    profile: Profile,
    usertype: string,
    __typename:string
}

export interface Profile{
    firstName: string,
    name:string,
    phone: string,
    gender: string,
    title:string
}

export interface Attachment {

}

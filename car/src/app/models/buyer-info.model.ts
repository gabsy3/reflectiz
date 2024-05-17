export interface IbuyerInfo {
    fullname: string;
    gender: string;
    email: string;
    birthDate: Date;
    location: Ilocation;
    hobbies: string[];
    favoriteColor: string;
    amountOfSeats: number;
    motorType: string;
}

export interface Ilocation {
    address: string;
    city: string;
    country: string;
}
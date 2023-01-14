import {Image} from "./image.model";

export interface User {
  id: number;
  wallet: number;
  registrationDate: number[];
  email: string;
  isLunchLady: boolean;
  name: string;
  firstname: string;
  phone: string;
  sex: number;
  status: number;
  imageId?: number;
  token?: string;
  image?: Image;
}



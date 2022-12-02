import { ImageModel } from "./image.model";

export interface UserIn {
    address:     string;
    wallet:      number;
    postalCode:  string;
    email:       string;
    isLunchLady: boolean;
    password:    string;
    name:        string;
    firstname:   string;
    phone:       string;
    town:        string;
    sex:         number;
    image:       ImageModel;
}

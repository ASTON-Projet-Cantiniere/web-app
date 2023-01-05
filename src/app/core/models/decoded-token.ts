import {User} from "@shared/models/user.model";
import {JwtPayload} from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  user: User;
  roles: string[];
}


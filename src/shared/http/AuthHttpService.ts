import { IUser } from "../models/interfaces";
import DB from "../services/DB";


export class AuthHttpService {
  static _currentUser?: IUser

  static get currentUser(): IUser | undefined {
    if (!this._currentUser) {
      try {
        const currentUser = localStorage.getItem('currentUser') || undefined
        this._currentUser = currentUser ? JSON.parse(currentUser) : currentUser;
      } catch (err) {
        this._currentUser = undefined;
      }
    }
    
    return this._currentUser;
  }

  static set currentUser(user: IUser | undefined) {
    this._currentUser = user ? {...user} : undefined;
    localStorage.setItem('currentUser', this._currentUser ? JSON.stringify(this._currentUser) : '');
  }

  static async login(email: string): Promise<IUser> {
    this.currentUser = DB.findUserByEmail(email.toLowerCase().trim());
    if (!this.currentUser) throw new Error('User not found');
    return this.currentUser;
  }

  static async registration({email, name}: {email: string, name: string}): Promise<IUser> {
    email = email.toLowerCase().trim();
    name = name.trim();
    const userInDb = DB.findUserByEmail(email);
    if (userInDb) throw new Error('User already exist');

    this.currentUser = DB.createUser({email, name}) as IUser;
    return this.currentUser;
  }

  static logout() {
    this.currentUser = undefined;
  }
}

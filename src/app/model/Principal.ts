/**
 * Created by Eike on 26.06.2017.
 */

export class Principal {

  public authenticated: boolean;

  public name: string;

  public roles: string[];

  public fullname: string;

  public email: string;

  constructor(name: string,
              roles: string[],
              fullname: string,
              email: string) {
    this.name = name;
    this.roles = roles;
    this.fullname = fullname;
    this.email = email;
    this.authenticated = false;
    if (roles.length > 0) {
      this.authenticated = true;
    }
  }
}

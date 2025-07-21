import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly validUsername = 'admin';
  private readonly validPassword = 'demo';

  login(username: string, password: string): boolean {
    return username === this.validUsername && password === this.validPassword;
  }
}

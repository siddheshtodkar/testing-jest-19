import { Injectable } from '@angular/core';
import { UserInterface } from '../types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserInterface[] = []
  addUser(user: UserInterface) {
    this.users = [...this.users, user]
  }
  removeUser(userId: string) {
    this.users = this.users.filter(user => user.id !== userId)
  }
}

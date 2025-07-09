import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../types/user.interface';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserInterface[] = []
  utils = inject(UtilsService)
  addUser(user: UserInterface) {
    this.users = [...this.users, user]
  }
  removeUser(userId: string) {
    this.users = this.users.filter(user => user.id !== userId)
  }
  getUsernames(): string[] {
    return this.utils.pluck(this.users, 'name')
  }

  // rxjs testing
  users$ = new BehaviorSubject<UserInterface[]>([])
  addUser$(user: UserInterface) {
    this.users$.next([...this.users$.getValue(), user])
  }
  removeUser$(userId: string) {
    this.users$.next(this.users$.getValue().filter(user => user.id !== userId))
  }
}
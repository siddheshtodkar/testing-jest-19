import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { UserInterface } from '../types/user.interface';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      let user: UserInterface = { id: "3", name: "john" }
      service.addUser(user)
      expect(service.users).toEqual([{ id: "3", name: "john" }])
    })
  })

  describe('removeUser', () => {
    it('should remove a user', () => {
      service.users = [{ id: "3", name: "john" }]
      service.removeUser("3")
      expect(service.users).toEqual([])
    })
  })
});
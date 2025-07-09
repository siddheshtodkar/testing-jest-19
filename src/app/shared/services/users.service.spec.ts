import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { UserInterface } from '../types/user.interface';
import { UtilsService } from './utils.service';

describe('UsersService', () => {
  let service: UsersService;
  let utilsService: UtilsService // normal and spy

  // Mock
  // const utilsServiceMock = {
  //   pluck: jest.fn()
  // }

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [UtilsService]
      providers: [
        UsersService,
        UtilsService, // normal and spy
        // { provide: UtilsService, useValue: utilsServiceMock } // Mock
      ]
    });
    service = TestBed.inject(UsersService);
    utilsService = TestBed.inject(UtilsService)
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

  describe('getUsernames', ()=>{
    it('should be usernames', ()=>{
      // normal
      service.users = [{id:'1', name:'Foo'}]
      expect(service.getUsernames()).toEqual(['Foo'])

      // spy
      // jest.spyOn(utilsService, 'pluck')
      // service.users = [{id:'1', name:'Foo'}]
      // service.getUsernames()
      // expect(utilsService.pluck).toHaveBeenCalledWith(
      //   service.users,
      //   'name'
      // )

      // Mock
      // utilsServiceMock.pluck.mockReturnValue(["Foo"])
      // expect(utilsServiceMock.pluck()).toEqual(['Foo'])
    })
  })

  // rxjs testing
  describe('addUser$', () => {
    it('should add a user', () => {
      let user: UserInterface = { id: "3", name: "john" }
      service.addUser$(user)
      expect(service.users$.getValue()).toEqual([{ id: "3", name: "john" }])
    })
  })

  describe('removeUser$', () => {
    it('should remove a user', () => {
      service.users$.next([{ id: "3", name: "john" }])
      service.removeUser$("3")
      expect(service.users$.getValue()).toEqual([])
    })
  })
});
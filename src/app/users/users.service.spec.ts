import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let http: HttpClient;
  const userList = [
    { "id": "id_1", "username": "user_name_1", "email": "test1@email.com" },
    { "id": "id_2", "username": "user_name_2", "email": "test2@email.com" },
    { "id": "id_3", "username": "user_name_3", "email": "test3@email.com" }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(UsersService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of users', () => {
    spyOn(http, 'get').and.returnValue(of(userList));

    TestBed.runInInjectionContext(() => {
      expect(service.isLoading()).toBeTruthy();
      const users = service.getUsers();
      expect(users()).toEqual(userList);
      expect(http.get).toHaveBeenCalledTimes(1);
      expect(service.isLoading()).toBeFalse();
    });

  });
});

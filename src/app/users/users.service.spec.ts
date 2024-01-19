import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let http: HttpClient;
  const mockedUsers = [
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

  it('should get registry users', () => {
    spyOn(http, 'get').and.returnValue(of(mockedUsers));

    expect(service.isLoading()).toBe(true);

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockedUsers);
      expect(service.isLoading()).toBe(false);
    });

    expect(http.get).toHaveBeenCalledOnceWith('https://mocki.io/v1/cf9bebf3-aaf5-4ac5-9e6a-53473d7f8135');
  });
});

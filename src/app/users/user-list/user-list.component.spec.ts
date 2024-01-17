import { HttpClientTestingModule } from '@angular/common/http/testing';
import { effect, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list.component';
import { User } from '../user';
import { UsersService } from '../users.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let usersService: UsersService;
  let fixture: ComponentFixture<UserListComponent>;
  const userList: User[] = [
    { "id": "id_1", "username": "user_name_1", "email": "test1@email.com" },
    { "id": "id_2", "username": "user_name_2", "email": "test2@email.com" },
    { "id": "id_3", "username": "user_name_3", "email": "test3@email.com" }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, NoopAnimationsModule, HttpClientTestingModule],
      providers: [UsersService],
    }).compileComponents();

    usersService = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isLoading()).toBeTruthy();
    expect(component.dataSource.data.length).toBe(0);
    expect(component.displayedColumns.length).toBe(3);
  });

  it('should populate MatTableDataSource with users', () => {
    spyOn(usersService, 'getUsers').and.returnValue(signal(userList));
    expect(component.dataSource.data.length).withContext('Data Source length before fetch').toBe(0);

    component.users = usersService.getUsers();

    TestBed.runInInjectionContext(() => {
      effect(() => {
        component.dataSource.data = component.users();
      });

      TestBed.flushEffects();
      expect(component.users()).withContext('User list after fetch').toEqual(userList);
      expect(component.dataSource.data.length).withContext('Data Source length after fetch').toBe(3);
      expect(component.dataSource.data).toEqual(userList);
    });
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list.component';
import { User } from '../user';
import { UsersService } from '../users.service';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let usersService: UsersService;
  let fixture: ComponentFixture<UserListComponent>;
  const mockedUsers: User[] = [
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

  it('should populate dataSource on init', async () => {
    spyOn(usersService, 'getUsers').and.returnValue(of(mockedUsers));

    await component.ngOnInit();
    await fixture.whenStable();

    expect(component.users).toEqual(mockedUsers);
    expect(component.dataSource.data).toEqual(mockedUsers);
    expect(usersService.getUsers).toHaveBeenCalledTimes(1);
  });
});

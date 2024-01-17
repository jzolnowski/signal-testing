import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users.component';
import { User } from './user.model';
import { UsersService } from './users.service';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UsersComponent;
  let usersService: UsersService;
  let fixture: ComponentFixture<UsersComponent>;
  const mockedUsers: User[] = [
    { "id": "id_1", "username": "user_name_1", "email": "test1@email.com" },
    { "id": "id_2", "username": "user_name_2", "email": "test2@email.com" },
    { "id": "id_3", "username": "user_name_3", "email": "test3@email.com" }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, NoopAnimationsModule, HttpClientTestingModule],
      providers: [UsersService],
    }).compileComponents();

    usersService = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    spyOn(usersService, 'getUsers').and.returnValue(of(mockedUsers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isLoading()).toBeTruthy();
    expect(component.dataSource.data.length).toBe(0);
    expect(component.displayedColumns.length).toBe(4);
  });

  it('should populate MatTableDataSource with users', async () => {
    expect(component.dataSource.data.length).withContext('Data Source length before fetch').toBe(0);

    await fixture.whenStable();
    TestBed.flushEffects();

    expect(component.users()).withContext('User list after fetch').toEqual(mockedUsers);
    expect(component.dataSource.data.length).withContext('Data Source length after fetch').toBe(3);
    expect(component.dataSource.data).toEqual(mockedUsers);
  });

  it('should add a new user', async () => {
    const newUser = {id: 'id_4', username: 'user_name_4', email: 'test4@email.com'}

    await fixture.whenStable();
    await component.addUser();
    TestBed.flushEffects();

    expect(component.dataSource.data.length).withContext('Data Source length after new user addition').toBe(4);
    expect(component.dataSource.data).toEqual([...mockedUsers, newUser]);
  });

  it('should remove user', async () => {
    await fixture.whenStable();
    await component.removeUser('id_2');
    TestBed.flushEffects();

    expect(component.dataSource.data.length).withContext('Data Source length after user remove').toBe(2);
    expect(component.dataSource.data[1].id).toBe('id_3');
  });
});

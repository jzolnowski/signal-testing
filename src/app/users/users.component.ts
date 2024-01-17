import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  inject,
  effect,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  WritableSignal
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from './user.model';
import { UsersService } from './users.service';
import { lastValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  readonly dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  readonly displayedColumns: string[] = ['id', 'username', 'email', 'action'];
  readonly isLoading = this.usersService.isLoading;
  users: WritableSignal<User[]> = signal([]);

  constructor() {
    effect(() => {
      // The data in the table will automatically update based on the users' current Signal value
      this.dataSource.data = this.users();
    });
  }

  async ngOnInit(): Promise<void> {
    this.users.set(await lastValueFrom(this.usersService.getUsers()));
  }

  addUser(): void {
    const iter = this.users().length + 1;
    this.users.update(users => [...users, {id: `id_${iter}`, username: `user_name_${iter}`, email: `test${iter}@email.com`}]);
  }

  removeUser(id: string): void {
    this.users.update(users => users.filter((user) => user.id !== id));
  }
}

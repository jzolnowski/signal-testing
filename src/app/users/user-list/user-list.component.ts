import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatProgressSpinnerModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private readonly usersService = inject(UsersService);
  readonly dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  readonly displayedColumns: string[] = ['id', 'username', 'email'];
  readonly isLoading = this.usersService.isLoading;
  users = this.usersService.getUsers();

  constructor() {
    effect(() => {
      console.log('this.users() effect', this.users());
      this.dataSource.data = this.users();
    });
  }
}

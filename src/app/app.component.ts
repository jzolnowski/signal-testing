import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserListComponent } from './users/user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}

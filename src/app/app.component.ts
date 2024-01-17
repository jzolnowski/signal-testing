import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UsersComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}

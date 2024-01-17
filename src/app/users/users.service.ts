import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly isLoading = signal(true);
  private readonly http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://mocki.io/v1/cf9bebf3-aaf5-4ac5-9e6a-53473d7f8135').pipe(
      take(3),
      tap(() => this.isLoading.set(false)),
    );
  }
}

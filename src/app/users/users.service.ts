import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { take, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly isLoading = signal(true);
  private readonly http = inject(HttpClient);

  getUsers(): Signal<User[]> {
    const users$ = this.http.get<User[]>('https://mocki.io/v1/cf9bebf3-aaf5-4ac5-9e6a-53473d7f8135').pipe(
      take(3),
      tap(() => this.isLoading.set(false)),
    );
    return toSignal(users$, {initialValue: [] as User[]});
  }
}

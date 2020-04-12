import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
  
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private readonly URL: string = environment.apiUrl;
    public isLogined$: BehaviorSubject<boolean>;
    public user$: BehaviorSubject<User>;
  
    constructor(private http: HttpClient){
        const user = JSON.parse(localStorage.getItem('user'));
        this.isLogined$ = new BehaviorSubject<boolean>(!!user && !!user.email);
        this.user$ = new BehaviorSubject<User>(user);
    }

      public singUp(user: User): Observable<any> {
        return this.http.post(`${this.URL}/signin`, user);
      }
    
      public login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.URL}/login`, { email, password }).pipe(
          filter(Boolean),
          tap(({user}: Record<string, User>) => {
            this.isLogined$.next(true);
            this.user$.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          })
        );
      }
    
      public logOut(): void {
        localStorage.removeItem('user');
        this.isLogined$.next(false);
        this.user$.next(null);
      }
}
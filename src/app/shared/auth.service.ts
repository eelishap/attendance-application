import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'https://64bb67705e0670a501d6fe5b.mockapi.io';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.get<any[]>(`${this.baseUrl}/user?username=${username}`).pipe(
      map((users: any[]) => {
        const user = users.find(u => u.password === password);
        return user ??  null;
      })
    );
  }

  signUp(user: any) {
    return this.http.post(`${this.baseUrl}/user`, user);
  }

  getData(id: number) {
    return this.http.get(`${this.baseUrl}/user/${id}/attendance`);
  }

  public logAttendance(id: number, data: any) {
    return this.http.post(`${this.baseUrl}/user/${id}/attendance`, data);
  }

  public isAuthenticated() {
    return localStorage.getItem('userId');
  }
}

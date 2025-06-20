import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { ApiEndpoints } from '../config/api-endpoints';
import { User } from '../models/users';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.apiUrl}`
    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}${ApiEndpoints.users}`);
    }

    createUser(userData: User): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}${ApiEndpoints.users}`, userData);
    }

    getUserByEmail(data: { email: string, password: string }) {
        const payload = {
            email: data.email,
            password: data.password
        }
        return this.http.post<any>(`${this.apiUrl}${ApiEndpoints.users}${ApiEndpoints.email}`, { email: payload });
    }

    getAllProviders(categoryId = null, registeredJobs = false, page = 1, limit = 20) {
        const queryParams = `?page=${page}&limit=${limit}&withRegisteredJobs=${registeredJobs}&categoryId=${categoryId}`
        return this.http.get<any>(`${this.apiUrl}${ApiEndpoints.users}${ApiEndpoints.providers}${queryParams}`)
    }

    updateUser(user: any, id: string): any {
        return this.http.put<any>(`${this.apiUrl}${ApiEndpoints.users}/${id}`, user)
    }


}

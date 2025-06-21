import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndpoints } from '../config/api-endpoints';





@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    private apiUrl = `${environment.apiUrl}`
    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}${ApiEndpoints.services}`);
    }

    addService(userId: string, data: any) {
        return this.http.post<any>(`${this.apiUrl}${ApiEndpoints.services}/${userId}`, data)
    }

    editDescription(description: string, jobId: string) {
        const data = { newDescription: description }
        return this.http.post<any>(`${this.apiUrl}${ApiEndpoints.services}/${jobId}`, data)
    }

    removeService(id: string) {
        return this.http.delete<any>(`${this.apiUrl}${ApiEndpoints.services}/${id}`)
    }


}
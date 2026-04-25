import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

 login(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}login/`, data);
}
getCustomers():Observable<any>{
  return this.http.get(`${this.apiUrl}customers/`);
}
addCustomers(customer: any): Observable<any> {
  return this.http.post(`${this.apiUrl}customers/`, customer);
}
deleteCustomer(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}customers/${id}/`);
}

updateCustomer(id: number, customer: any): Observable<any> {
  return this.http.put(`${this.apiUrl}customers/${id}/`, customer);
}
getVehiclesByCustomer(customerId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}vehicles/?customer=${customerId}`);
}

addVehicle(vehicle: any): Observable<any> {
  return this.http.post(`${this.apiUrl}vehicles/`, vehicle);
}

updateVehicle(id: number, vehicle: any): Observable<any> {
  return this.http.put(`${this.apiUrl}vehicles/${id}/`, vehicle);
}

deleteVehicle(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}vehicles/${id}/`);
}

}
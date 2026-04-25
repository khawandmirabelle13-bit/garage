import { Routes } from '@angular/router';
import {LoginComponent} from './login/login';
import{Home} from  './home/home';
import { Dashboards } from './dashboards/dashboards';
import { Jobcards } from './jobcards/jobcards';
import { CustomersComponent } from './customers/customers';
import { Invoices } from './invoices/invoices';
import { AddCustomerComponent } from './addcustomer/addcustomer';
import { VehiclesComponent } from './vehicles/vehicles';

export const routes: Routes = [
  { path: '', component:LoginComponent  },
  {path:'home',component:Home,
    children:[
         { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: Dashboards },
      { path: 'jobcards', component: Jobcards },
      { path: 'CustomersComponent', component: CustomersComponent },
      { path: 'invoices', component: Invoices },
        { path: 'vehicles/:customerId', component: VehiclesComponent },
    ]
  },
  { path: 'AddCustomerComponent', component: AddCustomerComponent },
];
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];

  showDialog = false;
  isUpdateMode = false;

  customerForm: any = {
    id: null,
    first_name: '',
    last_name: '',
    phone: '',
    email: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.authService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.log(err)
    });
  }

  AddCustomer() {
    this.isUpdateMode = false;
    this.showDialog = true;

    this.customerForm = {
      id: null,
      first_name: '',
      last_name: '',
      phone: '',
      email: ''
    };
  }

  updateCustomer(customer: any) {
    this.isUpdateMode = true;
    this.showDialog = true;

    this.customerForm = { ...customer };
  }

  saveCustomer() {
  if (this.isUpdateMode) {
    this.authService.updateCustomer(this.customerForm.id, this.customerForm).subscribe({
      next: (updatedCustomer) => {
        this.customers = this.customers.map(c =>
          c.id === updatedCustomer.id ? updatedCustomer : c
        );
        this.closeDialog();
      },
      error: (err) => console.log(err)
    });
  } else {
    this.authService.addCustomers(this.customerForm).subscribe({
      next: (newCustomer) => {
        this.customers = [...this.customers, newCustomer];
        this.closeDialog();
      },
      error: (err) => console.log(err)
    });
  }
}
  closeDialog() {
    this.showDialog = false;
  }
deleteCustomer(id: number) {
  if (confirm('Are you sure you want to delete?')) {
    this.authService.deleteCustomer(id).subscribe({
      next: () => {
        this.customers = this.customers.filter(c => c.id !== id);
      },
      error: (err) => console.log(err)
    });
  }
}

 viewCustomer(id: number) {
  this.router.navigate(['/home/vehicles', id]);
}
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/api';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicles.html',
  styleUrls: ['./vehicles.css']
})
export class VehiclesComponent implements OnInit {
  customerId!: number;
  vehicles: any[] = [];

  showDialog = false;
  isUpdateMode = false;

  vehicleForm: any = {
    id: null,
    customer: null,
    model: '',
    year: '',
    engine: '',
    gear: false,
    plate_number: '',
    attribute: ''
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('customerId'));
    this.getVehicles();
  }

  getVehicles() {
    this.authService.getVehiclesByCustomer(this.customerId).subscribe({
      next: (data) => this.vehicles = data,
      error: (err) => console.log(err)
    });
  }

  addVehicle() {
    this.isUpdateMode = false;
    this.showDialog = true;

    this.vehicleForm = {
      id: null,
      customer: this.customerId,
      model: '',
      year: '',
      engine: '',
      gear: false,
      plate_number: '',
      attribute: ''
    };
  }

  updateVehicle(vehicle: any) {
    this.isUpdateMode = true;
    this.showDialog = true;
    this.vehicleForm = { ...vehicle };
  }

  saveVehicle() {
    if (this.isUpdateMode) {
      this.authService.updateVehicle(this.vehicleForm.id, this.vehicleForm).subscribe({
        next: (updatedVehicle) => {
          this.vehicles = this.vehicles.map(v =>
            v.id === updatedVehicle.id ? updatedVehicle : v
          );
          this.closeDialog();
        }
      });
    } else {
      this.authService.addVehicle(this.vehicleForm).subscribe({
        next: (newVehicle) => {
          this.vehicles = [...this.vehicles, newVehicle];
          this.closeDialog();
        }
      });
    }
  }

  deleteVehicle(id: number) {
    if (confirm('Delete this vehicle?')) {
      this.authService.deleteVehicle(id).subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter(v => v.id !== id);
        }
      });
    }
  }

  closeDialog() {
    this.showDialog = false;
  }
}
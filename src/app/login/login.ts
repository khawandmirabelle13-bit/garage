import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

 login() {
  const data = {
    email: this.email,
    password: this.password
  };
this.authService.login(data).subscribe({
  next: (res) => {
    console.log('LOGIN SUCCESS', res);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.router.navigate(['/home']);
  },
  error: (err) => {
    console.log('LOGIN ERROR', err);
    this.errorMessage = 'Invalid email or password';
  }
});
}
}
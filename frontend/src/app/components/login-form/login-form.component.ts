import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private auth: AuthService,     // <-- Inject AuthService
    private router: Router         // <-- Inject Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: () => {
          // Redirect to home (Accueil)
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Login failed: ' + (err.error?.detail || 'Unknown error'));
        }
      });
    }
  }
}

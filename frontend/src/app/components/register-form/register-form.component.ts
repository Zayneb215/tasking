import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private auth: AuthService,
    private router: Router      // <-- Inject Router here
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.register(this.form.value).subscribe({
        next: () => {
          alert('Registration successful!');

          // -------------- REDIRECT --------------
          this.router.navigate(['/connexion']);   // <-- redirect to login page
        },
        error: (err) => {
          alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
        }
      });
    }
  }
}

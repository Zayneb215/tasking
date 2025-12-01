import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
    private auth: AuthService
  ) {}

  ngOnInit() {   // <-- MUST run, otherwise validators never initialize
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  submit() {
    if (this.form.valid) {
      this.auth.register(this.form.value).subscribe({
        next: (res) => {
          console.log("User registered!", res);
          alert('Registration successful!');
        },
        error: (err) => {
          alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
        }
      });
    }
  }
}
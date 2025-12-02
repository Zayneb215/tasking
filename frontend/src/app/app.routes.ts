import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  // { path: '', component: HomePageComponent, canActivate: [authGuard] },
  { path: '', component: HomePageComponent},

  { path: 'connexion', component: LoginPageComponent },
  { path: 'inscription', component: RegisterPageComponent },

  // 404 fallback
  { path: '**', redirectTo: '' }
];

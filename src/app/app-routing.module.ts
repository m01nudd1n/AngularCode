import { AuthenticationComponent } from './authentication/authentication.component';
import { CartComponent } from './product/cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './authentication/registration/registration/registration.component';
import { AuthGuard } from './authguard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/:id',
    component: HomeComponent
  },

  {
    path: '', pathMatch: 'full',
    component: HomeComponent
  },


  {
    path: 'user', component: AuthenticationComponent,
  children: [
    {
      path: 'registration', component: RegistrationComponent
    },
    {
      path: 'login', component: LoginComponent
    }
  ]
},
{

    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard]

},
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '**',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

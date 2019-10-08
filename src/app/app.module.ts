import { OrderService } from './shared/order.service';
import { RegistrationService } from './shared/registration.service';
import { HomeService } from './shared/home.service';
import { CartComponent } from './product/cart/cart.component';
import { UserService } from 'src/app/shared/user.service';
import { HeaderService } from './shared/header.service';
import { ProductService } from './product/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegistrationComponent } from './authentication/registration/registration/registration.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './authguard/auth.interceptor';
import { LoginService } from './shared/login.service';
import { DataSharingService } from './shared/datasharing.service';
import { OrderComponent } from './order/order.component';
import { AddressComponent } from './address/address.component';
import { AddressService } from './shared/address.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    LoginComponent,
    AuthenticationComponent,
    RegistrationComponent,
    CartComponent,
    HomeComponent,
    OrderComponent,
    AddressComponent


  ],
  imports: [
    FormsModule,
    BrowserModule,
    ProductModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    Ng2SearchPipeModule

  ],
  providers: [
              ProductService,
              DataSharingService,
              AddressService,
              HeaderService,
              OrderService,
              HomeService,
              RegistrationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, LoginService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

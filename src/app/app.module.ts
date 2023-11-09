import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Chineseff4Component } from './chineseff4/chineseff4.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { Usuario } from './models/usuario';
import { FooterComponent } from './login/footer/footer.component';
import { MainComponent } from './login/main/main.component';
import { NotLoggedComponent } from './login/not-logged/not-logged.component';
import { NotRegisteredComponent } from './login/not-registered/not-registered.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { RegisterComponent } from './login/register/register.component';
import { ExcercisesComponent } from './excercises/excercises.component';
import { NavBarComponent } from './excercises/nav-bar/nav-bar.component';
import { InfoComponent } from './excercises/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    Chineseff4Component,
    LoginComponent,
    FooterComponent,
    MainComponent,
    NotLoggedComponent,
    NotRegisteredComponent,
    SignInComponent,
    RegisterComponent,
    ExcercisesComponent,
    NavBarComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

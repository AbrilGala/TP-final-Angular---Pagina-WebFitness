import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

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
import { SpecificInfoComponent } from './excercises/info/specific-info/specific-info.component';
import { SearchBarComponent } from './excercises/search-bar/search-bar.component';
import { RoutinesComponent } from './routines/routines.component';
import { SelectMuscleComponent } from './excercises/select-muscle/select-muscle.component';
import { PaginationComponent } from './excercises/pagination/pagination.component';
import { NavBarLoggedComponent } from './nav-bar-logged/nav-bar-logged.component';
import { BmiComponent } from './bmi/bmi.component';
import { SpecificInformationComponent } from './routines/specific-information/specific-information.component';
import { SpecificInfoUserComponent } from './chineseff4/specific-info-user/specific-info-user.component';
import { SettingsComponent } from './chineseff4/specific-info-user/settings/settings.component';
import { PrivacyComponent } from './chineseff4/specific-info-user/privacy/privacy.component';
import { PublicRoutinesShowComponent } from './routines/public-routines-show/public-routines-show.component';
import { CreateRoutineComponent } from './routines/create-routine/create-routine.component';

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
    InfoComponent,
    SpecificInfoComponent,
    SearchBarComponent,
    RoutinesComponent,
    SelectMuscleComponent,
    PaginationComponent,
    NavBarLoggedComponent,
    BmiComponent,
    SpecificInformationComponent,
    SpecificInfoUserComponent,
    SettingsComponent,
    PrivacyComponent,
    PublicRoutinesShowComponent,
    CreateRoutineComponent
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

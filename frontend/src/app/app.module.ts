import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {DbComponent} from './db/db.component';
import {DbManagerComponent} from './db-manager/db-manager.component';
import {QsarComponent} from './qsar/qsar.component';
import {MatCardModule} from '@angular/material/card';
import {AssignmentsComponent} from './assignments/assignments.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    UserManagerComponent,
    DbComponent,
    DbManagerComponent,
    QsarComponent,
    AssignmentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MaterialFileInputModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

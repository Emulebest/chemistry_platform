import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {DbComponent} from './db/db.component';
import {DbManagerComponent} from './db-manager/db-manager.component';


const routes: Routes = [
  {path: 'register', component: AuthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UserManagerComponent},
  {path: 'dbs', component: DbComponent},
  {path: 'db_manager', component: DbManagerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

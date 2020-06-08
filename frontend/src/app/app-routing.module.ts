import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {DbComponent} from './db/db.component';
import {DbManagerComponent} from './db-manager/db-manager.component';
import {QsarComponent} from './qsar/qsar.component';
import {AssignmentsComponent} from './assignments/assignments.component';


const routes: Routes = [
  {path: 'register', component: AuthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserManagerComponent},
  {path: 'dbs', component: DbComponent},
  {path: 'db_manager', component: DbManagerComponent},
  {path: 'qsar', component: QsarComponent},
  {path: 'assignments', component: AssignmentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

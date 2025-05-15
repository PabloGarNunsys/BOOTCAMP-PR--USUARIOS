import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { FormUsersComponent } from './pages/form-users/form-users.component';


export const routes: Routes = [
    {
        path: "users",
        component: UsersComponent,
    },
    {
        path: "users/new",
        component: FormUsersComponent
    },
    {
        path: "users/:id",
        component: FormUsersComponent
    },
    {
        path: "**",
        redirectTo: "/users"
    }
];

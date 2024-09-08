import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './dashboard/create-task/create-task.component';

export const routes: Routes = [

    // {path:"",component:CreateTaskComponent},
    {path:"task",component:CreateTaskComponent},
    {path:"dashboard",component:DashboardComponent}
];

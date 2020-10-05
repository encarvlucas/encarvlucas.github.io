import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ErrorComponent } from './components/error-page/error.component';
import { SettingsComponent } from './components/settings/settings.component';
import { GuessingComponent } from './components/guessing/guessing.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { RandomWordsHelperComponent } from './components/random-words-helper/random-words-helper.component';


const routes: Routes = [
    // Main menu
    { path: 'home', component: HomeComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'dev', component: ProjectsComponent },
    { path: 'about', component: ErrorComponent },
    { path: 'settings', component: SettingsComponent },

    // Projects
    { path: 'emoji', component: GuessingComponent },
    { path: 'randomWords', component: RandomWordsHelperComponent },
    { path: 'scheduler', component: SchedulerComponent },
    { path: 'search', component: ErrorComponent }, // RegEx project

    // Redirects
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

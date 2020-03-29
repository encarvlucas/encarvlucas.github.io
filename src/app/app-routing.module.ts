import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ErrorComponent } from "./components/error-page/error.component";
import { DarkModeComponent } from "./components/dark-mode/dark.component";
import { GuessingComponent } from "./components/guessing/guessing.component";
import { SchedulerComponent } from "./components/scheduler/scheduler.component";


const routes: Routes = [
    // Main menu
    { path: "home", component: HomeComponent },
    { path: "error", component: ErrorComponent },
    { path: "projects", component: ProjectsComponent },
    { path: "dev", component: ProjectsComponent },
    { path: "about", component: ErrorComponent },
    { path: "dark", component: DarkModeComponent },

    // Projects
    { path: "emoji", component: GuessingComponent },
    { path: "scheduler", component: SchedulerComponent },

    // Redirects
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", redirectTo: "error", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

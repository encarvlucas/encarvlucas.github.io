import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ErrorComponent } from "./components/error-page/error.component";
import { DarkModeComponent } from "./components/dark-mode/dark.component";


const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "error", component: ErrorComponent },
    { path: "projects", component: ProjectsComponent },
    { path: "dev", component: ProjectsComponent },
    { path: "about", component: ErrorComponent },
    { path: "dark", component: DarkModeComponent },

    // Redirects
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", redirectTo: "error", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

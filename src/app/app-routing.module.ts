import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ErrorComponent } from "./components/error-page/error.component";


const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "error", component: ErrorComponent },
    { path: "projects", component: ProjectsComponent },
    { path: "projects/:dev", component: ProjectsComponent },
    { path: "about", component: ErrorComponent },
    { path: "dark", component: ErrorComponent },

    // Redirects
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", redirectTo: "error", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

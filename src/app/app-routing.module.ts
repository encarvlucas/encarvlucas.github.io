import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProjectsComponent } from "./components/projects/projects.component";


const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "projects", component: ProjectsComponent },
    { path: "projects/:dev", component: ProjectsComponent },

    // Redirects
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", redirectTo: "home", pathMatch: "full" }, // TODO: Implement 404 screen
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

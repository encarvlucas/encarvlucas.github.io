import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { HomeComponent } from "./home/home.component";
import { CardsComponent } from "./cards/cards.component";
import { ProjectsComponent } from "./projects/projects.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
        AppComponent,
        SideMenuComponent,
        HomeComponent,
        CardsComponent,
        ProjectsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

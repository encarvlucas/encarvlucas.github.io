import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./components/app.component";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { HomeComponent } from "./components/home/home.component";
import { CardsComponent } from "./components/cards/cards.component";
import { ProjectsComponent } from "./components/projects/projects.component";

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
        MatIconModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

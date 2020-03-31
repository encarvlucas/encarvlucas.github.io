import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { NgModule } from "@angular/core";
import * as importPrototypes from "./custom-prototypes";

import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";

import { StringComparePipe } from "./pipes/string-compare.pipe";

import { AppComponent } from "./components/app.component";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { HomeComponent } from "./components/home/home.component";
import { ErrorComponent } from "./components/error-page/error.component";
import { CardComponent } from "./components/card/card.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { DarkModeComponent } from "./components/dark-mode/dark.component";
import { GuessingComponent } from "./components/guessing/guessing.component";
import { SchedulerComponent } from "./components/scheduler/scheduler.component";

@NgModule({
    declarations: [
        AppComponent,
        SideMenuComponent,
        HomeComponent,
        ErrorComponent,
        CardComponent,
        ProjectsComponent,
        DarkModeComponent,
        GuessingComponent,
        SchedulerComponent,
        StringComparePipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatTabsModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatIconModule,
        HttpClientModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        StringComparePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

// tslint:disable-next-line: no-unused-expression
importPrototypes;

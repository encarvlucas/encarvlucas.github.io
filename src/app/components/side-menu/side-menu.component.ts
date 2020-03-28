import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { IconLink } from "src/app/models/icon-link.model";

@Component({
    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements OnInit {

    public links: IconLink[] = [
        {
            name: "Home",
            icon: "houseIcon",
            route: "/home",
        },
        {
            name: "Projects",
            icon: "rocketIcon",
            route: "/projects",
        },
        {
            name: "In Development",
            icon: "biohazardIcon",
            route: "/dev",
        },
        {
            name: "About Me",
            icon: "professionalIcon",
            route: "/about",
        },
        {
            name: "Dark Mode",
            icon: "moonIcon",
            route: "/dark", // TODO: Dark mode functionality
        },
    ];

    constructor(
        private iconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.iconRegistry.addSvgIcon(
            "dragonIcon",
            domSanitizer.bypassSecurityTrustResourceUrl("./assets/dragon-solid.svg")
        );
        this.iconRegistry.addSvgIcon(
            "showMoreIcon",
            domSanitizer.bypassSecurityTrustResourceUrl("./assets/angle-double-right-solid.svg")
        );
        this.iconRegistry.addSvgIcon(
            "houseIcon",
            domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-solid.svg")
        );
        this.iconRegistry.addSvgIcon(
            "rocketIcon",
            domSanitizer.bypassSecurityTrustResourceUrl("./assets/rocket-solid.svg")
        );
        this.iconRegistry.addSvgIcon(
            "biohazardIcon",
            domSanitizer.bypassSecurityTrustResourceUrl("./assets/biohazard-solid.svg")
        );
        this.iconRegistry.addSvgIcon(
            "professionalIcon",
            domSanitizer.bypassSecurityTrustResourceUrl("./assets/user-tie-solid.svg")
        );
        this.iconRegistry.addSvgIcon(
            "moonIcon",
            domSanitizer.bypassSecurityTrustResourceUrl("./assets/moon-solid.svg")
        );
    }

    ngOnInit(): void {
    }

}

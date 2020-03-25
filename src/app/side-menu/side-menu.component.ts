import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements OnInit {

    public links: Link[] = [
        {
            name: "Home",
            icon: "#houseIcon",
            route: "/home",
        },
        {
            name: "Projects",
            icon: "#rocketIcon",
            route: "/projects",
        },
        {
            name: "In Development",
            icon: "#alienIcon",
            route: "/projects/dev",
        },
        {
            name: "About Me",
            icon: "#professionalIcon",
            route: "/about",
        },
        {
            name: "Dark Mode",
            icon: "#moonIcon",
            route: "/", // TODO: Dark mode functionality
        },
    ];

    constructor() { }

    ngOnInit(): void {
    }

}

interface Link {
    name: string;
    icon: string;
    route: string;
}

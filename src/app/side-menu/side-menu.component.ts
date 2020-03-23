import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.less"],
    encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements OnInit {

    public links: Link[] = [
        {
            name: "Home",
            icon: "#houseIcon",
        },
        {
            name: "Projects",
            icon: "#rocketIcon",
        },
        {
            name: "In Development",
            icon: "#alienIcon",
        },
        {
            name: "About Me",
            icon: "#professionalIcon",
        },
        {
            name: "Dark Mode",
            icon: "#moonIcon",
        },
    ];

    constructor() { }

    ngOnInit(): void {
    }

}

interface Link {
    name: string;
    icon: string;
}

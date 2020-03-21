import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.less"]
})
export class SideMenuComponent implements OnInit {

    public links: Link[] = [
        {
            name: "First",
            icon: "icon",
        },
        {
            name: "Second",
            icon: "icon",
        },
        {
            name: "Third",
            icon: "icon",
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

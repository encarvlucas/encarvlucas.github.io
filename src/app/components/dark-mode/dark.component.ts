import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
    selector: "app-dark",
    templateUrl: "./dark.component.html",
    styleUrls: ["./dark.component.scss"]
})
export class DarkModeComponent implements OnInit {

    constructor(
        private location: Location
    ) { }

    ngOnInit(): void {
        console.log(`Went to dark mode component at ${new Date()}`);
        this.location.back();
    }

}

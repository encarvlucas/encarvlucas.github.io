import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
    @Input() public height = 200; // In pixels
    @Input() public width = 150; // In pixels
    @Input() public title = "Title"; // Card title
    @Input() public description = "Description"; // Card description
    @Input() public route = "/error"; // Card description
    @Input() public creationDate: Date; // Card date

    constructor() { }

    ngOnInit(): void {
    }

}

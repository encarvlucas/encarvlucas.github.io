import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
    @Input() public height?: number; // In pixels
    @Input() public width?: number; // In pixels
    @Input() public title = "Title"; // Card title
    @Input() public description = "Description"; // Card description
    @Input() public route = "/error"; // Card description
    @Input() public creationDate: Date; // Card date

    constructor() { }

    ngOnInit(): void {
    }

    public get style(): string {
        return `height: ${ this.height ? (this.height + "px") : "100%" };
                width: ${ this.width ? (this.width + "px") : "100%" };`;
    }

}

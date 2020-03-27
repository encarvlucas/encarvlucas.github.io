import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-error",
    templateUrl: "./error.component.html",
    styleUrls: ["./error.component.scss"]
})
export class ErrorComponent implements OnInit {

    public inConstruction: boolean;

    constructor(
        private router: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.router.url.subscribe(
            resp => {
                this.inConstruction = !resp.some(url => url.path === "error");
            }
        );
    }

}

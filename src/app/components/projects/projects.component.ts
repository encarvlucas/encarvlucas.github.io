import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-projects",
    templateUrl: "./projects.component.html",
    styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
    public dev: boolean;

    constructor(
        private router: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.router.params.subscribe(
            resp => {
                this.dev = resp?.dev === "dev";
            }
        );
    }

}

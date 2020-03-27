import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Project } from "src/app/models/project.model";

@Component({
    selector: "app-projects",
    templateUrl: "./projects.component.html",
    styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
    public dev: boolean;
    public projects: Project[];

    constructor(
        private router: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.router.params.subscribe(
            resp => {
                this.dev = resp?.dev === "dev";

                if (this.dev) {
                    this.projects = [
                        {
                            name: "Project A",
                            description: "First project attempt",
                            imageLink: "/pathToImage",
                            lastUpdated: new Date("2020-04-05T13:14:23"),
                        },
                        {
                            name: "Project B",
                            description: "New project attempt",
                            imageLink: "/pathToImage",
                        },
                        {
                            name: "Project C",
                            description: "Another project attempt",
                            imageLink: "/pathToImage",
                            lastUpdated: new Date("2018-12-04T21:05:12"),
                        },
                    ];
                }
            }
        );
    }

}

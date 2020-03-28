import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.dev = this.router.url === "/dev";

        if (this.dev) {
            this.projects = [
                {
                    name: "Emoji Guesser",
                    description: "Try to find out what pop culture meaning these emoji represent!",
                    route: "/emoji",
                    imageLink: "/pathToImage",
                    lastUpdated: new Date("2020-04-05T13:14:23"),
                },
                {
                    name: "Group Scheduler",
                    description: `Trying to arrange the best time and date for a group meeting but have trouble
                    getting everyone's best availabe date?

                    Try my group scheduler!`,
                    route: "/emoji",
                    imageLink: "/pathToImage",
                    lastUpdated: new Date("2018-12-04T21:05:12"),
                },
                {
                    name: "Project C",
                    description: "Another project attempt",
                    imageLink: "/pathToImage",
                },
            ];
        }
    }

}

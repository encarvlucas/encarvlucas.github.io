import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public dev: boolean;
  public projects: Project[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dev = this.router.url === '/dev';

    if (this.dev) {
      this.projects = [
        {
          name: 'PROJECTS.PROJECT.SCHEDULER.TITLE',
          description: 'PROJECTS.PROJECT.SCHEDULER.DESC',
          route: '/scheduler',
          imageLink: '/assets/images/planner.webp',
          lastUpdated: new Date('2018-12-04T21:05:12'),
          disabled: true
        },
        {
          name: 'PROJECTS.PROJECT.UNTITLED.TITLE',
          description: 'PROJECTS.PROJECT.UNTITLED.DESC', // RegExpr
          route: '/search',
          imageLink: '/assets/images/search.webp',
          disabled: true
        },
      ];
    } else {
      this.projects = [
        {
          name: 'PROJECTS.PROJECT.EMOJI.TITLE',
          description: 'PROJECTS.PROJECT.EMOJI.DESC',
          route: '/emoji',
          imageLink: '/assets/images/emoji-guess.jpg',
          lastUpdated: new Date('2020-04-03T17:38:00-03:00'),
        },
      ];
    }
  }

}

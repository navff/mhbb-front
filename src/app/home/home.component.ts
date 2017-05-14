import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivityService } from '../shared/activity.service';
import { Activity } from '../shared/activity';
@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  providers: [ActivityService],
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  interests = [{name: 'Interest 1'}, {name: 'Interest 2'}];
  cities = [{name: 'Череповец'}, {name: 'Вологда'}];


    activities: Activity[] = [];
    constructor(private httpService: ActivityService) {}

    ngOnInit() {

        this.httpService.getAllActivities().subscribe((data: Response) => this.activities = data.json());
    };
}

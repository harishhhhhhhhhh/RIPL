import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-team-details-component',
  templateUrl: './team-details-component.component.html',
  styleUrls: ['./team-details-component.component.css']
})
export class TeamDetailsComponentComponent implements OnInit{
  currentTeam :string ="";

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.currentTeam = this.route.snapshot.paramMap.get('teamName')!;
    
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-team-details-component',
  templateUrl: './team-details-component.component.html',
  styleUrls: ['./team-details-component.component.css']
})
export class TeamDetailsComponentComponent implements OnInit{
  currentTeam :string ="";
  public players: any[] | undefined;


  constructor(private route: ActivatedRoute, private service: ApiServiceService){}

  ngOnInit(): void {
    this.currentTeam = this.route.snapshot.paramMap.get('teamName')!;

  this.service.getDataBasedOnTeam(this.currentTeam).subscribe((res: any) => {
    this.players = res;
    
  })
  }


}

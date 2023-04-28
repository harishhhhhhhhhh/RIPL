import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-team-details-component',
  templateUrl: './team-details-component.component.html',
  styleUrls: ['./team-details-component.component.css']
})
export class TeamDetailsComponentComponent implements OnInit{
  currentTeam :string ="";
  captain : string ="captain";
  owner : string = "owner"
  teamDetails : any=[];
  battingPlayers : any=[];
  bowllingPlayers : any=[];
  allrounders : any=[];


  constructor(private route: ActivatedRoute,private service : ApiServiceService){}

  ngOnInit(): void {
    this.currentTeam = this.route.snapshot.paramMap.get('teamName')!;
    this.service.getDataBasedOnTeam(this.currentTeam).subscribe((res)=>{
      console.log("from team details",res);
      console.log("players",res.teamData[0].players);
      this.captain =res.teamData[0].teamCaptain;
      this.owner = res.teamData[0].teamOwners; 
      
      const players = res.teamData[0].players;
      if (Array.isArray(players)) {
       
    
        players.forEach((player) => {
          if (player.skill === "Batting All-rounder" || player.skill === "Batting") {
            this.battingPlayers.push(player);
          } else if (player.skill === "Bowling All-rounder" || player.skill === "Bowling") {
            this.bowllingPlayers.push(player);
          } else {
            this.allrounders.push(player);
          }
      
          
        });
      }
      


      console.log("batting",this.battingPlayers);
      console.log("bowling",this.bowllingPlayers);
      console.log("allrouner",this.allrounders);
    })
    
  }


}

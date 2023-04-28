import { Component ,ChangeDetectorRef} from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-admin-controlls-component',
  templateUrl: './admin-controlls-component.component.html',
  styleUrls: ['./admin-controlls-component.component.css']
})
export class AdminControllsComponentComponent {

  selectedTeam : any = "noteam";
  playerDetails : any =[];


  constructor(private service : ApiServiceService,private cdr : ChangeDetectorRef){}

  deleteCalled(teamid : any,playerid : any){
    console.log("deletecalle")
    this.service.deletePlayerFromPlayerTeam(teamid,playerid).subscribe((res)=>{
        if(res)
        {
          this.getData();
        }
    });
  }

  onTeamSelected( event :any){
    
    if(this.selectedTeam == "noteam")
    {
      alert("please select a team to get details");
    }
    else{
      this.getData();
     
    }
  }

  getData(){
    this.service.getDataBasedOnTeam(this.selectedTeam).subscribe((res)=>{
      console.log("ffrom delelte form team",res)
      this.playerDetails = res.teamData[0].players;
    })
  }

}

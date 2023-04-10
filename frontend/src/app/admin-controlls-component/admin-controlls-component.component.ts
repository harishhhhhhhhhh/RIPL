import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-admin-controlls-component',
  templateUrl: './admin-controlls-component.component.html',
  styleUrls: ['./admin-controlls-component.component.css']
})
export class AdminControllsComponentComponent {

  selectedTeam : any = "noteam";
  playerDetails : any =[];


  constructor(private service : ApiServiceService){}

  deleteCalled(){

  }

  onTeamSelected( event :any){
    
    if(this.selectedTeam == "noteam")
    {
      alert("please select a team to get details");
    }
    else{
      this.service.getDataBasedOnTeam(this.selectedTeam).subscribe((res)=>{
        console.log("ffrom delelte form team",res)
        this.playerDetails = res;
      })
    }
  }

}

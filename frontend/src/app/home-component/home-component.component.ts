import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  seasonNumber = "SEASON 8";
  team :any;

  constructor(private route : Router){}

  navigateTeam(teamName : string)
  {
    this.team = teamName;
    // this.route.navigate(['',teamName]);
  }

}

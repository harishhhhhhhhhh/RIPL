import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs'
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-team-selection-component',
  templateUrl: './team-selection-component.component.html',
  styleUrls: ['./team-selection-component.component.css']
})
export class TeamSelectionComponentComponent {
  @Output() haveTeam = new EventEmitter<string>();
  captain: any = "null";
  team: any = "SELECT A TEAM TO PICK A PLAYER";
  TotalTeams: any = ['TEAM-1', 'TEAM-2', 'TEAM-3', 'TEAM-4'];
  SelectedTeams: any = [];
  pickTeamflag = false;
  addPlayerButtonDisabled = true;
  randomIndex: any;
  private subscription!: Subscription;
  private timerSubscription!: Subscription;
  selectedTeamName :string = '';
  private currentIndex = 0;
  currentTeam = this.TotalTeams[this.currentIndex];
  readData: any = [
    {
      "id": '1',
      "name": 'harish',
      "skill": 'batter',
      'gender': 'male',
      'email': '630300202',
      'contact': '342636'
    },
    {
      "id": '2',
      "name": 'harish',
      "skill": 'batter',
      'gender': 'male',
      'email': '630300202',
      'contact': '342636'
    }
  ];
  
  constructor(private service: ApiServiceService, private cdr: ChangeDetectorRef) {

  }
  //-----------------------OutPut Emitter-------------------returning the isteamdetails using output emitter
  isTeamSelected() {
    this.haveTeam.emit(this.selectedTeamName);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.timerSubscription.unsubscribe();

  }
  // Function called after Select Random Option is Clicked 
  selectRandomOption() {
    if (this.TotalTeams.length >= 1) {
      this.pickTeamflag = true;
      this.randomIndex = Math.floor(Math.random() * this.TotalTeams.length);
      this.team = this.TotalTeams[this.randomIndex];
      this.subscription = interval(100).subscribe(() => {
        this.currentIndex = (this.currentIndex + 1) % this.TotalTeams.length;
        this.currentTeam = this.TotalTeams[this.currentIndex];
      });

      this.timerSubscription = timer(1500).subscribe(() => {
        this.currentTeam = this.team;
        this.addPlayerButtonDisabled = false;
        this.subscription.unsubscribe();
        this.ngOnDestroy();

      })
      console.log(this.TotalTeams);
    }
    else {
      alert("No Teams Available");
    }
  }

  Cancel() {
    this.pickTeamflag = false;
    this.selectedTeamName ='';
    this.addPlayerButtonDisabled = true;
    this.cdr.detectChanges();
    this.isTeamSelected();
  }

  Continue() {
    this.selectedTeamName =this.team;
    this.addPlayerButtonDisabled = true;
    this.pickTeamflag = false;
    this.addPlayerButtonDisabled = true;
    this.TotalTeams.splice(this.randomIndex, 1);
    this.cdr.detectChanges();
    this.ngOnDestroy();
    this.isTeamSelected();
  }
}

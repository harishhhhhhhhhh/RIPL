import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs'
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-team-selection-component',
  templateUrl: './team-selection-component.component.html',
  styleUrls: ['./team-selection-component.component.css']
})
export class TeamSelectionComponentComponent {
  @Output() haveTeam = new EventEmitter<string>();
  @Output() addedteamemit = new EventEmitter<string>();
  captain: any = "null";
  team: any = "SELECT A TEAM TO PICK A PLAYER";
  /*'Mighty Mavericks', 'Spartan Strikers', 'Uranus Hurricans', 'Mars Thunders', 'Mercury Steelers', 'Neptune Knights',
    'Venus Warriors', 'Vesta Avengers', 'Saturn Superstars', 'Pluto Panthers', 'Earth Heros', */
  TotalTeams: any = ['Jupiter Eagles', 'Ceres Strikers', 'Uranus Hurricans', 'Mars Thunders', 'Mercury Steelers', 'Neptune Knights',
  'Venus Warriors', 'Vesta Avengers', 'Saturn Superstars', 'Pluto Panthers', 'Earth Heros','Eris Falcons'];
  SelectedTeams: any = [];
  addStatus: boolean = false;
  deleteStatus: boolean = false;
  displayBanner: boolean = true;
  addedteam: any;
  pickTeamflag = false;
  addPlayerButtonDisabled = true;
  randomIndex: any;
  private subscription!: Subscription;
  private timerSubscription!: Subscription;
  selectedTeamName: string = '';
  private currentIndex = 0;
  adminAccess = false;
  currentTeam = this.TotalTeams[this.currentIndex];
  TeamDetails: any = [];
  arePlayersAvailable: any = false;
  deletedteam: any;
  totalteammembers: any = 0;
  constructor(private service: ApiServiceService, private cdr: ChangeDetectorRef) {
  }
  getteammembers(index: number) {
    this.totalteammembers = index;
    console.log(this.totalteammembers);
    this.cdr.detectChanges();
  }
  //-----------------------OutPut Emitter-------------------returning the isteamdetails using output emitter
  isTeamSelected() {
    this.haveTeam.emit(this.selectedTeamName);
  }

  newlyaddedTeam() {
    this.addedteamemit.emit(this.addedteam);
  }
  //--------paginator

  searchText: any;

  displayteamWinnerflag: boolean = false;
  donebtn: boolean = true;
  //-----------------------Function called after Select Random Option is Clicked 
  selectRandomOption() {
    this.displayteamWinnerflag=false;
    if(this.TotalTeams.length==0){
      alert('NO TEAMS AVAILABLE')
    }
    else if(this.TotalTeams.length==1){
      this.team=this.TotalTeams[0];
      this.pickTeamflag = true;
      this.displayteamWinnerflag = true;
      this.addPlayerButtonDisabled = false;
    }
    else{
    this.pickTeamflag = true;
    this.donebtn = false;
    this.randomIndex = Math.floor(Math.random() * this.TotalTeams.length);
    this.team = this.TotalTeams[this.randomIndex];
    this.subscription = interval(100).subscribe(() => {
      console.log(this.TotalTeams.length);
      this.currentIndex = (this.currentIndex + 1) % this.TotalTeams.length;
      this.currentTeam = this.TotalTeams[this.currentIndex];
      console.log(this.currentTeam);
    });

    this.timerSubscription = timer(1500).subscribe(() => {
      this.displayteamWinnerflag = true;
      this.addPlayerButtonDisabled = false;
      this.subscription.unsubscribe();
      // this.ngOnDestroy();
    })
    console.log(this.TotalTeams);
    }


  }
  done() {

    this.donebtn = true;
    this.selectedTeamName = '';
    this.totalteammembers = 0;
    this.isTeamSelected();
    this.cdr.detectChanges();
  }
  Cancel() {
    this.displayteamWinnerflag = false;
    this.pickTeamflag = false;
    this.selectedTeamName = '';
    this.addPlayerButtonDisabled = true;
    this.cdr.detectChanges();
    this.isTeamSelected();
    this.donebtn = true;
  }

  Continue() {
    this.displayteamWinnerflag = false;
    this.donebtn = false;
    this.selectedTeamName = this.team;
    this.addPlayerButtonDisabled = true;
    this.pickTeamflag = false;
    this.displayBanner = false;
    this.addPlayerButtonDisabled = true;
    this.TotalTeams.splice(this.randomIndex, 1);
    this.cdr.detectChanges();
    // this.ngOnDestroy();
    this.isTeamSelected();
    if (this.team) {
      this.onTeamSelection(this.team);
    }
  }

  //-------------------Get the details of the players who are in particular team
  Captain: any;
  Owners: any;
  onTeamSelection(teamName: any) {
    this.service.getDataBasedOnTeam(teamName).subscribe((res: any) => {
      if (res.length == 0) this.arePlayersAvailable = true;
      else this.arePlayersAvailable = false;
      this.TeamDetails = res;
      this.Captain = res[0].teamCaptain
      this.Owners = res[0].teamOwners
      console.log(res);
    })
  }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  //   if (this.timerSubscription) {
  //     this.timerSubscription.unsubscribe();
  //   }

  checkAdminStatus() {
    this.adminAccess = !(this.adminAccess);
    console.log(this.switchInput.nativeElement.checked);
  }


  // switch toggling
  @ViewChild('switchInput', { static: true }) switchInput: any;

  setSwitchOn() {
    this.switchInput.nativeElement.checked = true;
  }

  setSwitchOff() {
    this.switchInput.nativeElement.checked = false;
  }

  // Add operation

  addPlayerAdmin(team: string) {

    const index = this.TotalTeams.indexOf(team);
    if (index == -1) {
      console.log(team);
      this.displayteamWinnerflag = false;
      this.addedteam = team;
      this.TotalTeams.push(team);
      this.displayBanner = false;
      this.cdr.detectChanges();
      this.newlyaddedTeam();
    }
    
    else {
      return;
    }

    this.setSwitchOff();
    this.adminAccess = false;

  }

  // delete operation
  @Output() deletedteamemit = new EventEmitter<string>();
  existingdeletedTeam() {
    this.deletedteamemit.emit(this.deletedteam)
  }
  deletePlayerAdmin(team: string) {
    console.log(team);
    // this.setSwitchOff();
    // this.adminAccess = false;
    this.displayteamWinnerflag = false;
    const index = this.TotalTeams.indexOf(team);
    if (index == -1) {
      return;
    }
    else {
      this.deletedteam = team;
      this.TotalTeams.splice(index, 1);
      this.displayBanner = false;
      // this.deleteStatus = true;
      this.cdr.detectChanges();
      this.existingdeletedTeam();
    }
  }

}

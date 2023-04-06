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
  captain: any = "null";
  team: any = "SELECT A TEAM TO PICK A PLAYER";
  /* 'Mighty Mavericks','Spartan Strikers','Uranus Hurricans','Mars Thunders','Mercury Steelers','Neptune Knights',
'Venus  Warriors','Vesta Avengers',..'Pluto Panthers','Earth Heros','Eris Falcons'*/
  TotalTeams: any = ['Mighty Mavericks','Spartan Strikers','Uranus Hurricans','Mars Thunders','Mercury Steelers','Neptune Knights',
  'Venus Warriors','Vesta Avengers','Saturn Superstars','Pluto Panthers','Earth Heros','Eris Falcons'];
  SelectedTeams: any = [];
  addStatus: boolean = false;
  deleteStatus: boolean = false;
  displayBanner: boolean = true;
  pickTeamflag = false;
  addPlayerButtonDisabled = true;
  randomIndex: any;
  private subscription!: Subscription;
  private timerSubscription!: Subscription;
  selectedTeamName :string = '';
  private currentIndex = 0;
  adminAccess = false;
  currentTeam = this.TotalTeams[this.currentIndex];
  TeamDetails:any=[];
  arePlayersAvailable:any=false;
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
  
  //--------paginator
  
  searchText:any;

  

  //-----------------------Function called after Select Random Option is Clicked 
  selectRandomOption() {
    
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
        // this.ngOnDestroy();

      })
      console.log(this.TotalTeams);
      
    
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
    // this.ngOnDestroy();
    this.isTeamSelected();
    if(this.team){
      this.onTeamSelection(this.team);
    }
  }

  //-------------------Get the details of the players who are in particular team
  Captain:any;
  Owners:any;
  onTeamSelection(teamName:any){
    this.service.getDataBasedOnTeam(teamName).subscribe((res: any) => {
      if(res.length==0) this.arePlayersAvailable=true;
      else this.arePlayersAvailable=false;
      this.TeamDetails = res;
      this.Captain=res[0].teamCaptain
      this.Owners=res[0].teamOwners
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

    checkAdminStatus(){
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

    addPlayerAdmin(team: string){
    //   this.team = team;
    //   this.selectedTeamName = team;
    //   const index = this.TotalTeams.indexOf(team);
    //   this.TotalTeams.splice(index, 1);
    //   this.cdr.detectChanges();
    //   this.isTeamSelected();
    //   if(team){
    //   this.onTeamSelection(team);
    // }
    const index = this.TotalTeams.indexOf(team);
    if(index == -1){
  
      this.selectedTeamName = team;
      this.TotalTeams.push(team);
      this.displayBanner = false;
      this.addStatus = true;
      this.deleteStatus = false;
      this.cdr.detectChanges();
      this.isTeamSelected();
    }
      
    else{
      return;
    }

      this.setSwitchOff();
      this.adminAccess = false;
      
    }

    // delete operation

    deletePlayerAdmin(team: string){
      // this.setSwitchOff();
      // this.adminAccess = false;
      const index = this.TotalTeams.indexOf(team);
      if(index == -1){
        return;
      }
      else{
        this.selectedTeamName = team;
        this.TotalTeams.splice(index,1);
        this.displayBanner = false;
      this.deleteStatus = true;
      this.cdr.detectChanges();
      this.isTeamSelected();
      }
      console.log(this.TotalTeams);
      
    }

}

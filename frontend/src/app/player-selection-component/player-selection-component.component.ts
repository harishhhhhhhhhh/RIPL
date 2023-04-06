import { Component, OnInit, OnDestroy, ChangeDetectorRef ,ViewChild} from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { interval, Subscription, timer } from 'rxjs'
import { JsonPipe } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamSelectionComponentComponent } from '../team-selection-component/team-selection-component.component';
@Component({
  selector: 'app-player-selection-component',
  templateUrl: './player-selection-component.component.html',
  styleUrls: ['./player-selection-component.component.css']
})
export class PlayerSelectionComponentComponent implements OnInit{
  teams:any;
  page: number=1;
  count: number=0;
  tableSize:number=7;
  tableSizes:any=[5,10,15,20];
  
  
  newplayer:any;
  playerDetails: any = [];
  currentPlayerDetails: any = [];
  selectedItem: any = 'player';
  selectedSkill: any='player';
  currentWinner: string = '';
  pickPlayerFlag: boolean = false;
  winnerIndex: any;
  addPlayerButtonDisabled: boolean = true;
  displayWinnerFlag: any = false;
  pickSelectionErrorFlag = false;
  teamSelectedFlag :boolean= true;
  pickSelectionError: any = "* There are no players available to pick";
  private subscription!: Subscription;
  private timerSubscription!: Subscription;
  private currentIndex = 0;
  
  constructor(private service: ApiServiceService, private cdr: ChangeDetectorRef) {
    this.service.getTeams().subscribe((res:any)=>{
      this.teams=res;
    })
  }
  onTableDataChange(event:any){
    console.log(event);
    this.page=event;
    this.onSkillSelection({target: { value: this.selectedSkill }});
  }

  ngOnInit(): void {
    this.getDetails();
  }
  
  selectedTeamNames: string[] = [];

  isSelected(teamName: string): boolean {
    return this.selectedTeamNames.includes(teamName);
  }

  selectTeam(teamName: string) {
    const index = this.selectedTeamNames.indexOf(teamName);
    if ((index === -1) || (this.child.deleteStatus)) {
      this.selectedTeamNames.push(teamName);
    } else {
      this.selectedTeamNames.splice(index, 1);
    }
    console.log(this.selectedTeamNames + " selected array");
  }
  // ---------------------------------getting the team Selected or not from team-selection-component-----------------
  teamSelectedFromTeamComponent:string = '';
  teamSelectedvalue(newTeamvalue:string) {
    this.teamSelectedFromTeamComponent=newTeamvalue;
    this.selectTeam(this.teamSelectedFromTeamComponent);
    if(this.child.addStatus || this.child.deleteStatus){
      this.teamSelectedFlag = true;
    }
    else{
    this.teamSelectedFlag = false;
    }
  }
  
  
  
  // Accessing the matpaginator module using ViewChild
  // @ViewChild(MatPaginator) paginator!:MatPaginator

  // columns=['id','name','skill','gender','email','team'];
  ///retrive the data based on skill selection
  onSkillSelection(event: any) {
    console.log(event.target.value);
    this.selectedSkill = event.target.value;
    this.service.getDataBasedOnSkill(this.selectedSkill).subscribe((res: any) => {
      this.playerDetails = res;
      console.log("plalplfp",this.playerDetails)
    })
  }
  
  getDetails() {
    return this.service.getAllData().subscribe((res: any) => {
      this.playerDetails = res;
    })
  }
  
  
  currentItem = this.playerDetails[this.currentIndex];
  onPickSelection() {
    
    
    this.currentPlayerDetails = this.playerDetails;
    
    if (this.currentPlayerDetails <= 0) {
      this.pickSelectionErrorFlag = true;
    }
    else {
      this.pickPlayerFlag = true;
      this.winnerIndex = Math.floor(Math.random() * this.currentPlayerDetails.length);
      this.currentWinner = this.currentPlayerDetails[this.winnerIndex].name;
      console.log("lucy winner is", this.currentWinner);
      

      this.subscription = interval(100).subscribe(() => {
        this.currentIndex = (this.currentIndex + 1) % this.currentPlayerDetails.length;
        this.currentItem = this.currentPlayerDetails[this.currentIndex].name;
      });
      
      this.timerSubscription = timer(1500).subscribe(() => {
        this.displayWinnerFlag = true;
        this.addPlayerButtonDisabled = false;
        this.subscription.unsubscribe();
        // this.ngOnDestroy();
        
      })
    }
  }

  @ViewChild (TeamSelectionComponentComponent) child! : TeamSelectionComponentComponent;

  assignTeam(): void{
    this.service.assignTeamToThePlayer(this.currentPlayerDetails[this.winnerIndex].id,this.teamSelectedFromTeamComponent).subscribe((res)=>{
      console.log(res);
      this.getPlayersBasedOnTeam();
      
    });
  }

  getPlayersBasedOnTeam(){
    console.log("details based on team called")
    this.service.getDataBasedOnTeam(this.teamSelectedFromTeamComponent).subscribe((res)=>{
      console.log("getting team afetr assigng",res);
      this.child.TeamDetails  = res;
      this.cdr.detectChanges();
    })
  }

  async onAddThePlayerToTheTeam() {
  console.log(this.currentPlayerDetails[this.winnerIndex]);
   
    await this.assignTeam();
    
    this.pickPlayerFlag = false;
    this.addPlayerButtonDisabled = true;
    this.displayWinnerFlag = false;
    this.playerDetails.splice(this.winnerIndex, 1);
    this.cdr.detectChanges();
    // this.ngOnDestroy();

  }

  onCancelThePlayer() {
    this.displayWinnerFlag = false;
    this.pickPlayerFlag = false;
    this.cdr.detectChanges();
  }





}













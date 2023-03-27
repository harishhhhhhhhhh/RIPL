import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { interval, Subscription, timer } from 'rxjs'
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-player-selection-component',
  templateUrl: './player-selection-component.component.html',
  styleUrls: ['./player-selection-component.component.css']
})
export class PlayerSelectionComponentComponent implements OnInit, OnDestroy {

  selectedItem: any = 'player';
  playerDetails: any = [];
  selectedSkill: any;
  currentPlayerDetails: any = [];
  currentWinner: string = '';
  pickPlayerFlag: boolean = false;
  winnerIndex: any;
  addPlayerButtonDisabled: boolean = true;
  displayWinnerFlag: any = false;
  pickSelectionErrorFlag = false;
  pickSelectionError: any = "* There are no players available to pick";


  private subscription!: Subscription;
  private timerSubscription!: Subscription;
  private currentIndex = 0;


  currentItem = this.playerDetails[this.currentIndex];






  constructor(private service: ApiServiceService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getDetails();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.timerSubscription.unsubscribe();
  }


  onSkillSelection(event: any) {
    console.log(event.target.value);
    this.selectedSkill = event.target.value;
    this.service.getDataBasedOnSkill(this.selectedSkill).subscribe((res: any) => {
      this.playerDetails = res;
    })
  }

  getDetails() {
    return this.service.getAllData().subscribe((res: any) => {
      this.playerDetails = res;
       
    })
  }


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
        this.ngOnDestroy();

      })
    }
  }

  assignTeam(){
    this.service.assignTeamToThePlayer(this.currentPlayerDetails[this.winnerIndex].id,"Sunrisers Hyderabad").subscribe((res)=>{
        console.log(res);
    });
  }

  onAddThePlayerToTheTeam() {
  console.log(this.currentPlayerDetails[this.winnerIndex]);
   
    this.assignTeam();
    this.pickPlayerFlag = false;
    this.addPlayerButtonDisabled = true;
    this.displayWinnerFlag = false;

    this.playerDetails.splice(this.winnerIndex, 1);
    this.cdr.detectChanges();
    this.ngOnDestroy();

  }

  onCancelThePlayer() {
    this.displayWinnerFlag = false;
    this.pickPlayerFlag = false;
    this.cdr.detectChanges();
  }





}













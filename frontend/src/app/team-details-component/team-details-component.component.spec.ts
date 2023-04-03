import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailsComponentComponent } from './team-details-component.component';

describe('TeamDetailsComponentComponent', () => {
  let component: TeamDetailsComponentComponent;
  let fixture: ComponentFixture<TeamDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamDetailsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

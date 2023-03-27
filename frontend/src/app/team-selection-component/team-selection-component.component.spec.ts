import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSelectionComponentComponent } from './team-selection-component.component';

describe('TeamSelectionComponentComponent', () => {
  let component: TeamSelectionComponentComponent;
  let fixture: ComponentFixture<TeamSelectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamSelectionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamSelectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

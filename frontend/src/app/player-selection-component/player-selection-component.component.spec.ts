import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectionComponentComponent } from './player-selection-component.component';

describe('PlayerSelectionComponentComponent', () => {
  let component: PlayerSelectionComponentComponent;
  let fixture: ComponentFixture<PlayerSelectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerSelectionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSelectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

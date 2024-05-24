import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlScoreComponent } from './control-score.component';

describe('ControlScoreComponent', () => {
  let component: ControlScoreComponent;
  let fixture: ComponentFixture<ControlScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSemestersComponent } from './table-semesters.component';

describe('TableSemestersComponent', () => {
  let component: TableSemestersComponent;
  let fixture: ComponentFixture<TableSemestersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSemestersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSemestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

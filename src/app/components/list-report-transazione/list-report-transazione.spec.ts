import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReportTransazione } from './list-report-transazione';

describe('ListReportTransazione', () => {
  let component: ListReportTransazione;
  let fixture: ComponentFixture<ListReportTransazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReportTransazione],
    }).compileComponents();

    fixture = TestBed.createComponent(ListReportTransazione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

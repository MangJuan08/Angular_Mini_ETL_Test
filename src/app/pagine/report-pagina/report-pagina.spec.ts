import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPagina } from './report-pagina';

describe('ReportPagina', () => {
  let component: ReportPagina;
  let fixture: ComponentFixture<ReportPagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportPagina],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportPagina);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

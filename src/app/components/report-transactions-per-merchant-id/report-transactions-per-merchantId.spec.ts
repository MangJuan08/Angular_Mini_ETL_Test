import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTransactionsPerMerchantId } from './report-transactions-per-merchantId';

describe('ReportTransactionsPerMerchantId', () => {
  let component: ReportTransactionsPerMerchantId;
  let fixture: ComponentFixture<ReportTransactionsPerMerchantId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportTransactionsPerMerchantId],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportTransactionsPerMerchantId);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceCertificateComponent } from './clearance-certificate.component';

describe('ClearanceCertificateComponent', () => {
  let component: ClearanceCertificateComponent;
  let fixture: ComponentFixture<ClearanceCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

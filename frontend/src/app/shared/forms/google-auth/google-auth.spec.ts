import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuth } from './google-auth';

describe('GoogleAuth', () => {
  let component: GoogleAuth;
  let fixture: ComponentFixture<GoogleAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAuth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleAuth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

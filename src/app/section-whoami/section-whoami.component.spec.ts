import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWhoamiComponent } from './section-whoami.component';

describe('SectionWhoamiComponent', () => {
  let component: SectionWhoamiComponent;
  let fixture: ComponentFixture<SectionWhoamiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionWhoamiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionWhoamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

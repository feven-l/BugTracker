import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTicketComponent } from './show-ticket.component';

describe('ShowTicketComponent', () => {
  let component: ShowTicketComponent;
  let fixture: ComponentFixture<ShowTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jobcards } from './jobcards';

describe('Jobcards', () => {
  let component: Jobcards;
  let fixture: ComponentFixture<Jobcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jobcards],
    }).compileComponents();

    fixture = TestBed.createComponent(Jobcards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

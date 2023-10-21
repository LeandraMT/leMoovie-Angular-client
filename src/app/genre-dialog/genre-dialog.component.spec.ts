import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDialogComponent } from './genre-dialog.component';

describe('GenreDialogComponent', () => {
  let component: GenreDialogComponent;
  let fixture: ComponentFixture<GenreDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenreDialogComponent]
    });
    fixture = TestBed.createComponent(GenreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

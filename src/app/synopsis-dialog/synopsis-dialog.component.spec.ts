import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisDialogComponent } from './synopsis-dialog.component';

describe('SynopsisDialogComponent', () => {
  let component: SynopsisDialogComponent;
  let fixture: ComponentFixture<SynopsisDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SynopsisDialogComponent]
    });
    fixture = TestBed.createComponent(SynopsisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

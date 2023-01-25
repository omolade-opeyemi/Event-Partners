import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnimationExampleDialogComponent } from './dialog-animation-example-dialog.component';

describe('DialogAnimationExampleDialogComponent', () => {
  let component: DialogAnimationExampleDialogComponent;
  let fixture: ComponentFixture<DialogAnimationExampleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAnimationExampleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAnimationExampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

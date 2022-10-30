import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenUikitLibComponent } from './zen-uikit-lib.component';

describe('ZenUikitLibComponent', () => {
  let component: ZenUikitLibComponent;
  let fixture: ComponentFixture<ZenUikitLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZenUikitLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZenUikitLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

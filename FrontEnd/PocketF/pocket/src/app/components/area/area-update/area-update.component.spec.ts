import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaUpdateComponent } from './area-update.component';

describe('AreaUpdateComponent', () => {
  let component: AreaUpdateComponent;
  let fixture: ComponentFixture<AreaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QsarComponent } from './qsar.component';

describe('QsarComponent', () => {
  let component: QsarComponent;
  let fixture: ComponentFixture<QsarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QsarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QsarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

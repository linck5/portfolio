import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyworkItemComponent } from './mywork-item.component';

describe('MyworkItemComponent', () => {
  let component: MyworkItemComponent;
  let fixture: ComponentFixture<MyworkItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyworkItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyworkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

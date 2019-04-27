import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nItemComponent } from './i18n-item.component';

describe('I18nItemComponent', () => {
  let component: I18nItemComponent;
  let fixture: ComponentFixture<I18nItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I18nItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

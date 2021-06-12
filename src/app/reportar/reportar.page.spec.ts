import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportarPage } from './reportar.page';

describe('ReportarPage', () => {
  let component: ReportarPage;
  let fixture: ComponentFixture<ReportarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

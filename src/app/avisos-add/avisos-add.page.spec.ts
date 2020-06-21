import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisosAddPage } from './avisos-add.page';

describe('AvisosAddPage', () => {
  let component: AvisosAddPage;
  let fixture: ComponentFixture<AvisosAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisosAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

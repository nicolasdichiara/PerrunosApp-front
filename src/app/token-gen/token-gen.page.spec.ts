import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TokenGenPage } from './token-gen.page';

describe('TokenGenPage', () => {
  let component: TokenGenPage;
  let fixture: ComponentFixture<TokenGenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenGenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TokenGenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

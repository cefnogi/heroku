import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateinvoicePage } from './generateinvoice.page';

describe('GenerateinvoicePage', () => {
  let component: GenerateinvoicePage;
  let fixture: ComponentFixture<GenerateinvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateinvoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateinvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

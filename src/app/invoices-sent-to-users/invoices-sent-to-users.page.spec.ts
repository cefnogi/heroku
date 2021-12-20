import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvoicesSentToUsersPage } from './invoices-sent-to-users.page';

describe('InvoicesSentToUsersPage', () => {
  let component: InvoicesSentToUsersPage;
  let fixture: ComponentFixture<InvoicesSentToUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesSentToUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesSentToUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

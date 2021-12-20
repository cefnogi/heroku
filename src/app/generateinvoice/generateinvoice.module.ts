import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateinvoicePageRoutingModule } from './generateinvoice-routing.module';
//import { FindUserListComponent } from '../find-user-list/find-user-list.component';
import { GenerateinvoicePage } from './generateinvoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateinvoicePageRoutingModule
  ],
  declarations: [GenerateinvoicePage],
 // entryComponents:[FindUserListComponent]
})
export class GenerateinvoicePageModule {}

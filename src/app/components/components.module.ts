import { BankListModalComponent } from './bank-list-modal/bank-list-modal.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [BankListModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    Ng2SearchPipeModule,
  ],
  exports: [
    BankListModalComponent
  ],
  providers: [Ng2SearchPipe]
})
export class ComponentsModule { }

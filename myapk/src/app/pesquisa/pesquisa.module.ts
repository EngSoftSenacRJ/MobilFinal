import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesquisaPageRoutingModule } from './pesquisa-routing.module';

import { PesquisaPage } from './pesquisa.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesquisaPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsP7z9rHwL7w5oGSb0tfuUtbo25MC5Bxs'
    })
  ],
  declarations: [PesquisaPage]
})
export class PesquisaPageModule { }

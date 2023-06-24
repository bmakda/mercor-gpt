import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSpeechComponent } from './web-speech.component';
import { MaterialModule } from '../shared/material/material.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [WebSpeechComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatProgressSpinnerModule
  ]
})
export class WebSpeechModule { }

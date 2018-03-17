import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadbarComponent } from './loadbar.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [LoadbarComponent],
    exports: [LoadbarComponent]
})
export class LoadbarModule { }

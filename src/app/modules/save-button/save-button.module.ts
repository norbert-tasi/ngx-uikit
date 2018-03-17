import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveButtonComponent } from './save-button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [SaveButtonComponent],
    exports: [SaveButtonComponent]
})
export class SaveButtonModule { }

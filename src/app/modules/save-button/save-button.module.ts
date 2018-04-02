import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveButtonComponent } from './save-button.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [
        ButtonModule
    ],
    declarations: [SaveButtonComponent],
    exports: [SaveButtonComponent]
})
export class SaveButtonModule { }

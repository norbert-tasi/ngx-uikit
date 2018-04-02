import { NgModule } from '@angular/core';
import { CloseButtonComponent } from './close-button.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [
        ButtonModule
    ],
    declarations: [CloseButtonComponent],
    exports: [CloseButtonComponent]
})
export class CloseButtonModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonComponent } from './select-button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [SelectButtonComponent],
    exports: [SelectButtonComponent]
})
export class SelectButtonModule { }

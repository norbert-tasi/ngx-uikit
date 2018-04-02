import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app
import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [EditorComponent],
    exports: [EditorComponent],
    providers: [EditorService]
})
export class EditorModule { }

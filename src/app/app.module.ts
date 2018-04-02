import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CheckboxModule } from '../../public_api';
import { CloseButtonModule } from './modules/close-button/close-button.module';
import { DeleteButtonModule } from './modules/delete-button/delete-button.module';
import { LoadbarModule } from './modules/loadbar/loadbar.module';
import { SaveButtonModule } from './modules/save-button/save-button.module';
import { SelectButtonModule } from './modules/select-button/select-button.module';
import { ButtonModule } from './modules/button/button.module';
import { EditorModule } from './modules/editor/editor.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ButtonModule,
        CheckboxModule,
        CloseButtonModule,
        DeleteButtonModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule,
        LoadbarModule,
        SaveButtonModule,
        SelectButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'ui-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    form: FormGroup;
    title = 'app';
    constructor(private fb: FormBuilder) {

        this.form = this.fb.group({
            text: new FormControl('cicamica', Validators.required),
            text2: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            readability: new FormControl('')
        });
        this.form.patchValue({ text2: 'updated value', gender: 'MALE' });
    }

}

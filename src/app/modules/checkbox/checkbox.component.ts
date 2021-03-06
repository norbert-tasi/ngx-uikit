import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

export const CHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};

@Component({
    selector: 'ui-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor {

    @Input() value: any;
    @Input() name: string;
    @Input() disabled: boolean;
    @Input() label: string;
    @Input() tabindex: number;
    @Input() inputId: string;
    @Input() style: any;
    @Input() styleClass: string;
    @Input() formControl: FormControl;
    @Output() change: EventEmitter<any> = new EventEmitter();

    model: any;
    focused = false;
    checked = false;

    constructor(private cd: ChangeDetectorRef) { }

    onModelChange: Function = () => { };

    onModelTouched: Function = () => { };

    onClick(event, checkbox, focus: boolean) {
        event.preventDefault();

        if (this.disabled) {
            return;
        }

        this.checked = !this.checked;
        this.updateModel();

        if (focus) {
            checkbox.focus();
        }
    }

    updateModel() {
        this.onModelChange(this.checked);
        this.change.emit(this.checked);
    }

    handleChange(event) {
        this.checked = event.target.checked;
        this.updateModel();
    }

    isChecked(): boolean {
        return this.model;
    }

    onFocus(event) {
        this.focused = true;
    }

    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }

    writeValue(model: any): void {
        this.model = model;
        this.checked = this.isChecked();
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }
}


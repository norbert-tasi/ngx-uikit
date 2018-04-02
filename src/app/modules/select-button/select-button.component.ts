import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const SELECTBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectButtonComponent),
    multi: true
};

export interface SelectItem {
    value: string;
    label: string;
}

@Component({
    selector: 'ui-select-button',
    templateUrl: './select-button.component.html',
    styleUrls: ['./select-button.component.scss'],
    providers: [SELECTBUTTON_VALUE_ACCESSOR]
})
export class SelectButtonComponent implements ControlValueAccessor {

    @Input() tabindex: number;
    @Input() multiple: boolean;
    @Input() style: any;
    @Input() styleClass: string;
    @Input() disabled: boolean;
    @Input() optionLabel: string;
    @Output() optionClick: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();

    value: any;
    focusedItem: HTMLInputElement;
    _options: any[];

    onModelChange: Function = () => { };

    onModelTouched: Function = () => { };

    constructor(private cd: ChangeDetectorRef) { }

    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        this._options = val;
    }

    writeValue(value: any): void {
        this.value = value;
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

    onItemClick(event, option: SelectItem, checkbox: HTMLInputElement, index: number) {
        if (this.disabled) {
            return;
        }

        checkbox.focus();

        if (this.multiple) {
            const itemIndex = this.findItemIndex(option);
            if (itemIndex !== -1) {
                this.value = this.value.filter((val, i) => i !== itemIndex);
            } else {
                this.value = [...this.value || [], option.value];
            }
        } else {
            this.value = option.value;
        }

        this.optionClick.emit({
            originalEvent: event,
            option: option,
            index: index
        });

        this.onModelChange(this.value);

        this.change.emit({
            originalEvent: event,
            value: this.value
        });
    }

    onFocus(event: Event) {
        this.focusedItem = <HTMLInputElement>event.target;
    }

    onBlur(event) {
        this.focusedItem = null;
        this.onModelTouched();
    }

    isSelected(option: SelectItem) {
        if (this.multiple) {
            return this.findItemIndex(option) !== -1;
        } else {
            return this.value === option.value;
        }
    }

    findItemIndex(option: SelectItem) {
        let index = -1;
        if (this.value) {
            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i] === option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
}

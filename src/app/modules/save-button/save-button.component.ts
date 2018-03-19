import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'ui-save-button',
    templateUrl: './save-button.component.html',
    styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent {

    @Input() label: string;
    @Input() disabled: boolean;
    @Output() save = new EventEmitter<void>();

    onClick() {
        if (this.save) {
            this.save.emit();
        }

    }
}

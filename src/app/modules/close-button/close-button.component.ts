import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ui-close-button',
    templateUrl: './close-button.component.html',
    styleUrls: ['./close-button.component.scss']
})
export class CloseButtonComponent {

    @Input() label: string;
    @Output() click = new EventEmitter<void>();

    constructor() { }

    onClick() {
        if (this.click) {
            this.click.emit();
        }
    }

}

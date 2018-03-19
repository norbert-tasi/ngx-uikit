import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ui-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {

    @Input() label: string;
    @Output() click = new EventEmitter<void>();

    constructor() { }

    onClick() {
        this.click.emit();
    }


}

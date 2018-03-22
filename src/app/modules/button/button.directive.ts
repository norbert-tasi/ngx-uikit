import { Directive, Input, HostBinding, AfterViewInit, Optional, OnChanges, SimpleChanges, Self, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { boolify, exists, Classes, TypedChanges } from '../core/lang';
import { StyledControl } from '../core/control';
import { hasContent } from '../core/render';

const prefix = 'uk-button';

@Directive({
    selector: '[uiButton]',
    providers: [NgClass]
})
export class ButtonDirective extends StyledControl implements AfterViewInit {

    private _hasContent = true;
    private _loading = false;
    private _ghost = false;

    @Input() color: 'primary' | 'secondary' | 'danger' | 'success' | 'error' | 'info' | 'warning' | 'default' = 'default';
    @Input() size: 'large' | 'small' | 'default' = 'small';
    @Input() icon: string | null = null;

    constructor(public el: ElementRef,
        chref: ChangeDetectorRef,
        @Self() @Optional() protected ngClass?: NgClass,
        @Self() @Optional() protected ngStyle?: NgStyle) {

        super(chref, ngClass, ngStyle);
    }

    @Input()
    set loading(value: boolean) { this._loading = boolify(value); }
    get loading(): boolean { return this._loading; }

    @Input()
    set ghost(value: boolean) { this._ghost = boolify(value); }
    get ghost(): boolean { return this._ghost; }

    @Input()
    set uiButton(value: 'primary' | 'secondary' | 'danger' | 'success' | 'error' | 'info' | 'warning' | 'default' | '' | undefined) {
        this.color = value || 'default';
    }

    @ViewChild('content')
    set content(value: ElementRef | undefined) {
        if (value) {
            const contentWrapper = value.nativeElement;
            this._hasContent = hasContent(contentWrapper);
            this.forceUpdate();
        }
    }

    ngAfterViewInit() {
        if (!this.icon) {
            return;
        }
        const iconElement = document.createElement('span');
        iconElement.className = 'uk-float-left';
        iconElement.setAttribute('uk-icon', this.icon);
        this.el.nativeElement.appendChild(iconElement);
    }

    ngOnUpdate(changes: TypedChanges<this>, firstChange: boolean): void {
        this.hostClasses = {
            [`${prefix}`]: true,
            [`${prefix}-${this.color}`]: exists(this.color),
            [`${prefix}-${this.size}`]: exists(this.size),
            [`${prefix}-loading`]: this._loading,
            [`${prefix}-ghost`]: this._ghost,
        };
    }
}


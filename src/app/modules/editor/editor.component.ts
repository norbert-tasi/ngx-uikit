import { Component, Input, forwardRef, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as TuiEditor from 'tui-editor';

// app
// declare var TuiEditor: any;

export const EDITOR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
};

@Component({
    selector: 'ui-editor',
    templateUrl: './editor.component.html',
    styleUrls: [
        '../../../../node_modules/codemirror/lib/codemirror.css',
        '../../../../node_modules/tui-editor/dist/tui-editor.css',
        '../../../../node_modules/tui-editor/dist/tui-editor-contents.css',
        '../../../../node_modules/highlight.js/styles/github.css',
        './editor.component.scss'],
    providers: [EDITOR_VALUE_ACCESSOR]
})
export class EditorComponent implements AfterViewInit, ControlValueAccessor {

    @Input() resultFormat: 'markdown' | 'wysiwyg' = 'markdown';
    @Input() options: object;
    @Input() disabled: boolean;
    @Output() change: EventEmitter<any> = new EventEmitter();
    value: string;
    editor: any;

    constructor(public el: ElementRef) { }

    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };

    ngAfterViewInit() {
        const editorElement = this.el.nativeElement.querySelector('div.ui-editor');
        this.editor = new TuiEditor(Object.assign({
            el: editorElement,
            initialValue: this.value,
            initialEditType: this.resultFormat,
            previewStyle: 'vertical',
            height: '300px'
        }, this.options));

        this.editor.on('change', (delta, oldContents, source) => {

            let html = this.editor.getHtml();
            let markdown = this.editor.getMarkdown();
            const text = this.editor.getValue().trim();
            if (text.length === 0) {
                html = null;
                markdown = null;
            }

            this.change.emit({
                htmlValue: html,
                textValue: text,
                markdown: markdown
            });
            this.onModelChange(this.resultFormat === 'markdown' ? markdown : html);
            this.onModelTouched();

        });
    }

    writeValue(obj: any): void {
        console.log('ezzel itt mi van?......................................');
        console.log(obj);
        this.value = obj;
        if (this.editor) {
            this.editor.setHtml(obj);
        }
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}

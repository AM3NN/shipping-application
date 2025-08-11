import { Injectable } from '@angular/core';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Injectable({
    providedIn: 'root'
})
export class MarkedService {
    constructor() {
        marked.setOptions({
            gfm: true,
            breaks: true
        });
    }

    parse(markdown: string): string {
        const rawHtml = marked.parse(markdown || '') as string;
        return DOMPurify.sanitize(rawHtml);
    }
}

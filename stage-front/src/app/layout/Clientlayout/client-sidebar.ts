// client-sidebar.ts
import {Component, ElementRef} from '@angular/core';
import { AppClientMenu } from './client.menu';

@Component({
    selector: 'app-client-sidebar',
    imports: [AppClientMenu],
    template: `<div class="layout-sidebar"><app-client-menu></app-client-menu></div>`
})
export class AppClientSidebar {
    constructor(public el: ElementRef) {}
}

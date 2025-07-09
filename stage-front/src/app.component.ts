import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
        if (window.location.href.includes('code=')) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
}

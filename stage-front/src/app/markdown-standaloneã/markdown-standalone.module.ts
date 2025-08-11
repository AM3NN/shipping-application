import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';

@NgModule({
    imports: [
        MarkdownModule.forRoot({
            sanitize: SecurityContext.HTML
        }),
    ],
    exports: [MarkdownModule]
})
export class MarkdownStandaloneModule {}

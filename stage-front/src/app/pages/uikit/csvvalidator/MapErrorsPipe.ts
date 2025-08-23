import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapErrors' })
export class MapErrorsPipe implements PipeTransform {
    transform(errors: any): string {
        if (!errors) return '';
        return Object.keys(errors).join(', ');
    }
}

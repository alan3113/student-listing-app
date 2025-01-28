import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'grade',
    standalone: true,
    pure: true // Ensuring pure pipe for better performance
})
export class GradePipe implements PipeTransform {
    transform(value: string | number): string {
        if (value === null || value === undefined) return '';

        const num = Number(value);
        if (isNaN(num) || num < 1 || num > 12) {
            return value.toString();
        }

        const suffix = this.getSuffix(num);
        return `${num}${suffix} Grade`;
    }

    private getSuffix(num: number): string {
        if (num >= 11 && num <= 13) return 'th';

        switch (num % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
}
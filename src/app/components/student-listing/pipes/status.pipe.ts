import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
  pure: true
})
export class StatusPipe implements PipeTransform {
  transform(totalMarks: number): string {
    if (totalMarks === null || totalMarks === undefined) return '';
    
    if (totalMarks >= 240) {
      return 'Excellent';
    } else if (totalMarks >= 150 && totalMarks <= 239) {
      return 'Average';
    } else {
      return 'Below Average';
    }
  }
}
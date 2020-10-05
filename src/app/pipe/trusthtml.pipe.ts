import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'TrustHtml',
  pure: true
})
export class TrusthtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(pUnsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(pUnsafe);
  }

}


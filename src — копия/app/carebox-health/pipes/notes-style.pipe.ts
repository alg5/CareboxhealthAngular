import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'notesstyle'
})
export class NotesStylePipe implements PipeTransform {

    monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(private _domSanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value));
  }
 

  private stylize(text: string): string {
    let stylizedText: string = '';
    
    const arr = text.split(". ");
    for (let i = 0; i < arr.length; i++)
    {
        let item = arr[i];
        item = this.stylesDate(text);
        stylizedText +=  `<p>${item}</p>`;
    }
    return stylizedText;
  }
  
  stylesDate(text: string): string{
    let res = text;
    this.monthArr.forEach(function(item) {
      let n1 = text.toLowerCase().indexOf(item.toLowerCase());
      if (n1 > -1)
      {
        let d = text.substring(n1, n1+20);
        let n2 = d.lastIndexOf(',');
        if (n2 > 0)
        {
            d = d.substring(0, n2);
            res = res.replace(d, `<b>${d}</b>`);
        }
      }
    });
    return res;
}
  
//   As of November 21, 2020
//   March 12, 2020

}
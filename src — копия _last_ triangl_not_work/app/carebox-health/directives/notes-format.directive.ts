import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';
@Directive({
  selector: '[notesformat]'
})
export class NotesFormatDirective implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    console.log("NotesFormatDirective", this.el.nativeElement.textContent, this.el.nativeElement.innerText);
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText('Hello world!');
  
    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.el.nativeElement, div);
  }

}

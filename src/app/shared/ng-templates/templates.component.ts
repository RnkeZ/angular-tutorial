import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  @ViewChild('templateLeft') public templateLeft: TemplateRef<any>;
  @ViewChild('templateRight') public templateRight: TemplateRef<any>;
  @ViewChild('templateImage') public templateImage: TemplateRef<any>;
  @ViewChild('templateDate') public templateDate: TemplateRef<any>;
  @ViewChild('templatePercent') public templatePercent: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root', // Selektor komponente. HTML anotacija sa kojom možemo instancirati komponentu <app-root></app-root>
  templateUrl: './app.component.html', // Lokacija template-a
  styleUrls: ['./app.component.css'] // Lokacija stila
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.navigate(['/login'], { skipLocationChange: true });
  }
}

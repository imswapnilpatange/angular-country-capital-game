import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryCapitalComponent } from "./component/game/countrycapital.component";

@Component({
  selector: 'app-root',
  imports: [CountryCapitalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-country-capital-game';
  
  data: { [key: string]: string } = {
    Germany: "      Berlin      ",
    Scotland: "Edinburgh",
    Latvia: "Riga",
    Estonia: "Tallin",
    Ukraine: "Kiev",
    England: "London",
    Russia: "Moscow",
    India: null
  };
}

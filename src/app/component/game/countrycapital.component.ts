import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  template: `
          <div *ngIf="complete">
			      <p>Congratulations</p>
            <button (click)="reset()">Reset</button>
		      </div>
          <div class="buttons">
            <div *ngFor="let item of buttons">
              <div class="button">
                <button
                  (click)="handleButtonClick(item)"
                  [ngClass]="{'blue' : item.selected, 'red' : item.error, 'default' : item.error && item.selected}">
                  {{ item.name }}
                </button>
              </div>
            </div>
          </div>
          `,
  styles: [
    'p {font-family: Lato;}', 
    '.buttons {display: inline-flex;}',
    '.blue {background-color: #0000ff;}',
    '.red {background-color: #ff0000;}',
    '.default {background-color: white;}',
    '.button {padding: 5px;}']
})
export class CountryCapitalComponent implements OnInit{

  buttons: Button[] = [];
  numberButtonsSelected: number = 0;
  selections: { selection1: Button; selection2: Button } = {
    selection1: null,
    selection2: null
  };
  complete: boolean = false;

  @Input() data: { [key: string]: string } = {};

  ngOnInit(): void {
    this.generateButtons();
  }

  handleButtonClick(button: Button) {
    if (!button.selected) {
      button.selected = true;
      this.insertSelections(button);
      this.numberButtonsSelected++;

      this.buttons.forEach((item) => {
        item.error = false;
      });
    }

    if (this.numberButtonsSelected === 2) {
      if (this.match()) {
        this.handleSuccess();
      } else {
        this.handleFailure();
      }
    }
  }

  match(): boolean {
    //if country selected first
    if (Object.keys(this.data).includes(this.selections.selection1.name)) {
      if (
        this.data[this.selections.selection1.name] ==
        this.selections.selection2.name
      ) {
        return true;
      }
    }

    //if capital selected first
    else if (
      this.getKeyByValue(this.data, this.selections.selection1.name) ==
      this.selections.selection2.name
    ) {
      return true;
    }

    return false;
  }

  insertSelections(button: Button) {
    if (this.selections.selection1 == null) {
      this.selections.selection1 = button;
    } else if (this.selections.selection2 == null) {
      this.selections.selection2 = button;
    }
  }

  handleSuccess() {
    this.removeElements();
    this.selections = {
      selection1: null,
      selection2: null
    };
    this.numberButtonsSelected = 0;

    if (this.buttons.length == 0) {
      this.complete = true;
    }
  }

  handleFailure() {
    this.buttons.forEach((item) => {
      item.selected = false;
    });

    this.selections.selection1.error = true;
    this.selections.selection2.error = true;

    this.numberButtonsSelected = 0;
    this.selections = {
      selection1: null,
      selection2: null
    };
  }

  reset() {
    this.generateButtons();
    this.complete = false;
  }

  removeElements() {
    this.buttons = this.buttons.filter((item) => !item.selected);
  }

  generateButtons() {
    this.buttons = [];
    var buttonNames1 = this.shuffle(
      Object.keys(this.data).concat(Object["values"](this.data))
    );

    var buttonNames = this.shuffle(
      Object.keys(this.data)
      .filter(key => this.data[key] !== null) // Filter out null keys
      .concat(Object.values(this.data).filter(value => value !== null)) // Filter out null values
    );

    for (var i = 0; i < buttonNames.length; i++) {
      this.buttons.push({
        name: buttonNames[i],
        selected: false,
        error: false
      });
    }
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

}

export class Button {
  name: string;
  selected: boolean;
  error: boolean;

  constructor(){
    this.name = '';
    this.selected = false;
    this.error = false;
  }
}


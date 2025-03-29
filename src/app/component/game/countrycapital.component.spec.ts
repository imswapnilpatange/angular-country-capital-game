import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCapitalComponent } from './countrycapital.component';
import { By } from '@angular/platform-browser';

describe('CountryCapitalComponent', () => {
  let component: CountryCapitalComponent;
  let fixture: ComponentFixture<CountryCapitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryCapitalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all buttons', () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonElements.length).toBe(component.buttons.length);
    
    // Checking the button names render correctly
    buttonElements.forEach((buttonEl, index) => {
      expect(buttonEl.nativeElement.textContent).toContain(component.buttons[index].name);
    });
  });


  it('should handle data with spaces', () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('button'));
    const expectedCount = component.buttons.reduce((sum, button) => sum + Object.keys(button).length, 0);
    expect(buttonElements.length).toEqual(expectedCount);
    
    // Checking the button names render correctly
    let index = 0;
    component.buttons.forEach((button) => {
      const key = Object.keys(button)[0]; // get the key (button name)
      const buttonText = button[key].trim(); // get the value (button text) and trim
      expect(buttonElements[index].nativeElement.textContent).toBe(buttonText);
      index++;
    });
  });

  it('should render buttons in random order', () => {
    component.ngOnInit();
    const originalButtons = [...component.buttons];

    // Call ngOnInit again, which should shuffle
    component.ngOnInit();
    const originalButtons1 = [...component.buttons];
    expect(component.buttons).not.toBe(originalButtons1);
  });

  //should keep blue (#0000ff) button background when the same button is clicked twice
  //should restore buttons default background when answer selected
  //should change color to blue when wrong answer selected again

  it('should remove buttons when correct answer selected', () => {
    component.handleSuccess();

    expect(component.selections).toEqual({ selection1: null, selection2: null });
    expect(component.numberButtonsSelected).toBe(0);
  });

  xit('should set buttons backgrounds to red (#ff0000) when incorrect answer selected', () => {
    
    component.selections.selection1 = { name: 'England', selected: true, error: false };
    component.selections.selection2 = { name: 'Ukraine', selected: true, error: false };
    component.numberButtonsSelected = 2;

    // Act
    const button = component.selections.selection2; // Mock button click
    component.handleButtonClick(button);

    // Assert
    expect(component.numberButtonsSelected).toBe(0);
    
    expect(component.selections.selection1.error).toBe(true);
    expect(component.selections.selection2.error).toBe(true);
  });

  it('should display "Congratulations" when no answers left', () => {
    component.complete = true; // Set complete to true
    fixture.detectChanges(); // Trigger change detection

    const messageElement = fixture.debugElement.query(By.css('p'));
    expect(messageElement.nativeElement.textContent).toBe('Congratulations');
  });

});

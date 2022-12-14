import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lib-tester';

  tableData = [
    {
      name: 'Hammerer Maccabeus',
      types: 'Holy/Fire',
      attack: 1,
      defense: 1,
      speed: 1,
      healing: 1,
      recovery: 1,
      health: 5
    },
    {
      name: 'Ethereal Moodmorph',
      types: 'Water/Fire',
      attack: 1,
      defense: 1,
      speed: 1,
      healing: 1,
      recovery: 1,
      health: 5
    },
  ];
  
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
    this.formGroup = this.formBuilder.group({
      field1: ['',Validators.required],
      field2: [true, Validators.required],
      field3: ['', Validators.required]
    })
  }

  public onAction(event: Event) {
    console.log(event);
  }
}

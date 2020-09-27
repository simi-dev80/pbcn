import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-background-check',
  templateUrl: './background-check.component.html',
  styleUrls: ['./background-check.component.scss']
})
export class BackgroundCheckComponent implements OnInit {
  backgroundCheckForm: FormGroup;
  stepCount = 0;
  constructor() { }

  ngOnInit(): void {
    this.initBackgroundCheckForm();
  }

  moveNext(val) {
    this.stepCount += val;
  }

  initBackgroundCheckForm() {
    this.backgroundCheckForm = new FormGroup({
      stepone: new FormGroup({
        country: new FormControl('')
      }),
      steptwo: new FormGroup({
        country: new FormControl('')
      }),
    })
  }

  saveBackgroundCheck() {

  }

}

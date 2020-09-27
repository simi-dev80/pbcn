import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-background-check',
  templateUrl: './background-check.component.html',
  styleUrls: ['./background-check.component.scss']
})
export class BackgroundCheckComponent implements OnInit {
  backgroundCheckForm: FormGroup;
  stepCount = 0;
  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Background Check');
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

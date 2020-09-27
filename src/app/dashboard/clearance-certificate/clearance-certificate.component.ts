import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-clearance-certificate',
  templateUrl: './clearance-certificate.component.html',
  styleUrls: ['./clearance-certificate.component.scss']
})
export class ClearanceCertificateComponent implements OnInit {
  characterClearanceForm: FormGroup;
  stepCount = 0;
  constructor() { }

  ngOnInit(): void {
    this.initCharacterClearanceForm();
  }

  moveNext(val) {
    this.stepCount += val;
  }

  initCharacterClearanceForm() {
    this.characterClearanceForm = new FormGroup({
      stepone: new FormGroup({
        country: new FormControl('')
      }),
      steptwo: new FormGroup({
        country: new FormControl('')
      }),
    })
  }

  saveCharacterClearance() {

  }
}

import { FeedbackService } from './../services/feedback.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Feedback , ContactType} from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { switchMap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class ContactComponent implements OnInit {
  route: any;

  constructor(private formBuilder: FormBuilder,
              private feedBackService: FeedbackService) {

    this.createForm();
   }

  feedbackForm: FormGroup;
  feedback: Feedback;
  submitFlag = false;
  confirmFlag = false;
  contactType = ContactType;
  feedbackConfirm: Feedback;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: ''
  };

  validationMessages = {
    firstname: {
      required:      'First Name is required.',
      minlength:     'First Name must be at least 2 characters long.',
      maxlength:     'FirstName cannot be more than 25 characters long.'
    },
    lastname: {
      required:      'Last Name is required.',
      minlength:     'Last Name must be at least 2 characters long.',
      maxlength:     'Last Name cannot be more than 25 characters long.'
    },
    telnum: {
      required:      'Tel. number is required.',
      pattern:       'Tel. number must contain only numbers.'
    },
    email: {
      required:      'Email is required.',
      email:         'Email not in valid format.'
    },
  };

  ngOnInit(): void {

  }

  createForm(){
    this.feedbackForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit(){
    this.submitFlag = true;
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);

    this.feedBackService.putFeedback(this.feedback)
      .subscribe(confirm => {this.feedbackConfirm = confirm; this.confirmFlag = true; });

    setTimeout(() => {this.submitFlag = false; this.confirmFlag = false; }, 5000);

    this.feedbackForm.reset({
    firstname: '',
    lastname: '',
    telnum: 0,
    email: '',
    agree: false,
    contacttype: 'None',
    message: ''
    });
    
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}

import { Comment } from './../shared/Comment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from './../services/dish.service';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { switchMap, take } from 'rxjs/operators';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Feedback , ContactType} from '../shared/feedback';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  comments: Comment[];
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  userComment: Comment;
  contactType = ContactType;
  @ViewChild('fform') commentFormDirective;

  constructor(private dishService: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private formBuilder: FormBuilder)
              {

                this.createForm();
              }

formErrors = {
  author: '',
  comment: ''
};

validationMessages = {
  author: {
    required:      'Author name is required.',
    minlength:     'Author name must be at least 2 characters long.',
  },
  comment: {
    required:      'Comment is required.',
    minlength:     'Comment must be at least 10 characters long.',
  },
};

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params.id)))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);  this.comments = this.dish.comments; });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

  createForm(){
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating : 5,
      comment: ['', [Validators.required, Validators.minLength(10)] ]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit(){

    this.userComment = this.commentForm.value;
    this.userComment.date = new Date().toISOString();
    this.dish.comments.push(this.userComment);
    console.log(this.dish.comments);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      comments: '',
      rating: '5'
      });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
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

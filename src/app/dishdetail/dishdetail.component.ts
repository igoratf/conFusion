import { Component, OnInit, Inject} from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Comment } from '../shared/comment';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  feedbackForm: FormGroup;
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  constructor(private dishService: DishService,
     private route: ActivatedRoute,
     private location: Location,
     private fb: FormBuilder,
     @Inject('BaseURL') private BaseURL
      ) {   }

  ngOnInit() {
    this.createForm();
    this.dishService.getDishIds().
    subscribe(dishIds => this.dishIds = dishIds);

    this.route.params.switchMap((params: Params) => this.dishService.getDish(+params['id']))
    .subscribe(dish => {
      this.dish = dish;
      this.setPrevNext(dish.id);
    });


  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', Validators.required],
      rating: [0, [Validators.max(5), Validators.min(1)]]
    });

    console.log(this.feedbackForm.get('username').value);
  }

  resetForm() {
    this.feedbackForm.reset({
      'username': '',
      'rating': 0,
      'comment': ''
    });
  }

  submitComment() {
    this.dish.comments.push({
      rating: this.feedbackForm.get('rating').value,
      comment: this.feedbackForm.get('comment').value,
      author: this.feedbackForm.get('username').value,
      date: Date.now().toString()
    });

    this.resetForm();
  }



}

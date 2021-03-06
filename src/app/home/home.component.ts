import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';

import { PromotionService } from '../services/promotion.service';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  leaderErrMsg: string;
  promoErrMsg: string;

  constructor(private promotionService: PromotionService,
    private dishService: DishService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, errmsg => { this.dishErrMsg = errmsg;});
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, errmsg => { this.promoErrMsg = errmsg;});
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader, errmsg => { this.leaderErrMsg = errmsg;});
  }

}

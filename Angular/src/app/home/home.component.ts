import { PromotionService } from './../services/promotion.service';
import { Promotion } from './../shared/promotion';
import { DishService } from './../services/dish.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;


  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService,
              @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish);
    this.promotionService.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedgetLeader()
    .subscribe(leader => this.leader = leader);
  }

}

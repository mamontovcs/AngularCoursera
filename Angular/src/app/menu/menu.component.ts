import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from './../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';
import {Dish} from '../shared/dish';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishService: DishService,
              @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes, errMess => this.errMess = (errMess as any));
  }
}

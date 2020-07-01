import { Injectable } from '@angular/core';
import { LEADERS } from './../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]>{

    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS), 2000);
    });
  }

  getFeaturedgetLeader(): Promise<Leader> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });
  }
}

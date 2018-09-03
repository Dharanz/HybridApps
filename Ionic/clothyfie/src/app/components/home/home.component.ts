import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  images = [
  '../../../assets/carousalImages/img1.jpg', 
  '../../../assets/carousalImages/img2.jpg',
  '../../../assets/carousalImages/img3.jpeg',
  '../../../assets/carousalImages/img4.jpeg'
]
  constructor() { }

  ngOnInit() {
  }

}

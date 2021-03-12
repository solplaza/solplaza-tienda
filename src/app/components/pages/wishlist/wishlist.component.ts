import { Component, OnInit } from '@angular/core';
import { FakeDbService } from 'src/app/services/fake-db.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(public fakeDB: FakeDbService) { }

  ngOnInit() {
  }

}

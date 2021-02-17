import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartDetails: any;
  public cartEntry: any
  public payable: number;
  public emptyCart: boolean;
  public repeateItem: any = 0;
  public cartArray = [];
  public repeatCount: any = 0;
  public price: any;
  public response: any;
  public represpo: any;
  public payed: boolean=false;
  public routeback: boolean=false;


  constructor(private router: Router,private spinner: NgxSpinnerService) {
    this.getCartDetails()
  }

  ngOnInit(): void {
  }
  getCartDetails() {
    if (localStorage.getItem("userCart") == undefined) {
      this.emptyCart = true;
    }
    else if (localStorage.getItem("userCart")) {
      this.emptyCart = false;
      this.cartDetails = JSON.parse(localStorage.getItem("userCart"))
      console.log(this.cartDetails.length)
      this.payment();
    }
  }
  removeItemFromCart(removeitem) {
    if (this.cartDetails.indexOf(removeitem) > -1) {
      this.cartDetails.splice(this.cartDetails.indexOf(removeitem), 1);
      console.log("removed item ---->", removeitem)
      localStorage.setItem("userCart", JSON.stringify(this.cartDetails));
      this.getCartDetails()
      console.log(this.cartDetails)
    }
    if (this.cartDetails.length == 0) {
      console.log("empty")
      this.emptyCart = true
    }
  }
  payment() {
    this.payable = 0;
    this.cartDetails = JSON.parse(localStorage.getItem("userCart"))
    this.cartDetails.map(response => {
      this.payable += response.price;
    })
  }
  paymentDone()
  {
    document.getElementById("modal").style.display = "none";
    this.payed=true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    this.payed=false;
      this.routeBackHome();
    }, 3000);
  }

  routeBackHome()
  {
    this.routeback=true;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      setTimeout(() => {
    this.router.navigate(['userinfo']);
  },1000);
    }, 3000);
    localStorage.clear();
  }
  close() {
    document.getElementById("modal").style.display = "none";
    this.router.navigate(['userinfo'])
  }
}

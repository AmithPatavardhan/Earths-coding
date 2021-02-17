import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { UserInfoServiceService } from './user-info-service.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],

})
export class UserInfoComponent implements OnInit {
  @ViewChild('editModal') editModal: TemplateRef<any>; // Note: TemplateRef

  BookDetails: any
  public searchedText = "";
  public cartItemCount = 0;
  public rowSelected: boolean = false;
  public cartItem: any;
  public cartArray = [];
  public addedtoCart: boolean = false;
  public msg: boolean;
  public modalReference: any;
  public selected:any;
  public notificationCount=0;
  public sortOptions = [
    {
      sortOption: "asc",
      disp: "Lowest to Highest rating"
    },
    {
      sortOption: "des",
      disp: "Highest to Lowest rating"
    },
    {
      sortOption: "asc",
      disp: "Lowest to Highest price"
    },
    {
      sortOption: "des",
      disp: "Highest to Lowest price"
    }
  ]

  ngOninit() {

  }
  constructor(private userInfoService: UserInfoServiceService, private router: Router, private modalService: NgbModal,private spinner:NgxSpinnerService) {
    if(this.BookDetails==(undefined||null))
    {
     console.log(this.BookDetails)
      this.spinner.show();
    }
    userInfoService.getUserInfo().subscribe(user => {
      this.BookDetails = user;
      this.spinner.hide();
    })
    if (localStorage.getItem("userCart")) {
      var data = JSON.parse(localStorage.getItem("userCart"))
      console.log(data.length)
      this.cartItemCount = data.length;

    }
  }

  ngOnInit(): void { }

  openModal() {
    this.modalReference = this.modalService.open(this.editModal);
    setTimeout(() => {
      this.modalReference.close();
    },
      1000);

  }

  sortkey(array, key) {
    console.log(this.BookDetails)
    console.log(key)
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  sortkeydes(array, key) {
    console.log(this.BookDetails)
    console.log(key)
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }
  sortRatings(val) {
    if (val == 'Lowest to Highest rating') {
      console.log("hbhbhb")
      this.BookDetails = this.sortkey(this.BookDetails, 'average_rating');
    }
    else if (val == 'Highest to Lowest rating') {
      this.BookDetails = this.sortkeydes(this.BookDetails, 'average_rating');
    }
    else if (val == 'Highest to Lowest price') {
      this.BookDetails = this.sortkeydes(this.BookDetails, 'price');
    }
    else if (val == 'Lowest to Highest price') {
      this.BookDetails = this.sortkey(this.BookDetails, 'price');
    }
  }
  userSelectionToCart(event) {
    console.log(event)
    this.cartItem = event
    this.rowSelected = true
  }
  closeModal() {
    document.getElementById("modal").style.display = "none";
    this.rowSelected = false;
  }
  routeToCart() {
    this.router.navigate(['/cart'])
  }
  addToCart(cart) {
    if (localStorage.getItem("userCart") == undefined) {
      this.cartArray.push(this.cartItem.value);
      localStorage.setItem("userCart", JSON.stringify(this.cartArray))
      this.cartItemCount = this.cartArray.length;
      this.openModal()
    }
    else if (localStorage.getItem("userCart")) {
      var obj = {};
      this.addedtoCart = true;
      obj = this.cartItem.value;
      var cartData = JSON.parse(localStorage.getItem("userCart"));
      this.cartArray = cartData;
      this.cartArray.push(obj);
      localStorage.setItem("userCart", JSON.stringify(this.cartArray))
      this.openModal()
      this.cartItemCount = this.cartArray.length;
    }
    document.getElementById("modal").style.display = "none";
    this.rowSelected = false;
  }
}

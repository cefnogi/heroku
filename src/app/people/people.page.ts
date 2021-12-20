import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import {ApiService} from '../../provider/api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  public userData:any=[];
  public renderData:any[]
  loginUID: string;
  data: any;
  constructor(public api:ApiService, private router: Router,private route: ActivatedRoute) {
    this.loginUID=localStorage.getItem("loginUID");
    console.log(this.loginUID);
    this.findData();
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log(this.data);
      }
    })
   }

  ngOnInit() {
  }

  fundTransferToUser(param){
      console.log(param);
      let navigationExtras: NavigationExtras = {
        queryParams: {
        destinationUser: JSON.stringify(param)
          }
      };
      this.router.navigate(['moneytransfer'],navigationExtras);
  }

  findData(){
    this.api.fetchInnerWebContent('users').then(bata=>{
     // console.log(bata);
      this.userData=bata;
     // console.log(this.userData);
     // for(let k=0;k<bata.length;)
     var filterUserData=[];
     this.userData.forEach(element => {
      //  console.log(element);
        if(element.funding_source_status=="added"){
            if(element.uid==this.loginUID){
            
            }else{
              filterUserData.push(element);
              // console.log(filterUserData);
               this.renderData=filterUserData;
               console.log(this.renderData);
            }
              //console.log(element.funding_source);
             

        
        }
     });

      //'this.featuredContentPointer=bata;
  })
}




}

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alo='shit happens'
  url = `https://api.giphy.com/v1/gifs/search?api_key=UsrbTXZTtwKxOd0uMFMT9MYF5e8EY99E&q=${this.alo}`
  Imagearray = [];

  constructor() { }

  ngOnInit() {
    this.getImages()
  }
  getImages(){
    axios.get(this.url).then((Images)=>{
      this.Imagearray = Images.data['data']
      console.log("alo alo", this.Imagearray)
    }).catch((error)=>{
      console.log(error)
    })
  }
}
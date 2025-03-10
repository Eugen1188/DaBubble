import { Component, inject, Injectable, OnInit } from '@angular/core';
import { UserService } from '../shared.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { log } from 'node:console';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-directmessages',
  imports: [CommonModule],
  templateUrl: './directmessages.component.html',
  styleUrl: './directmessages.component.scss'
})
export class DirectmessagesComponent implements OnInit {
  userService = inject(UserService);
  index: number = -1;
  public users: any[] = [];
  public currentReciever: any = null;
  public currentUser: any = null;

  userID: string = '';

  firestore = inject(Firestore);
  constructor() {
  }

  async ngOnInit() {


    this.setCurrentReciever();
  }

  setCurrentReciever() {

    // this.currentReciever=this.userService.currentReciever;
    // this.currentUser=this.userService.currentUser;

    const storedReceiver = localStorage.getItem('currentReceiver');
    if (storedReceiver) {
      this.currentReciever = JSON.parse(storedReceiver);
    }
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
    console.log( this.currentReciever);
    console.log(this.currentUser);
    
  }
















}

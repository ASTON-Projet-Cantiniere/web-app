import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@shared/models/user.model';
import { UserService } from '@shared/services/user.service';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form_user !: FormGroup;
  public id: number = 0;
  public user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }


   

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    this.user= this.userService.getUserByID(this.id).subscribe(
      (resp:any) => {
        this.user = resp;
        console.log(this.user);
      }
    );
    console.log(this.user);
    this.form_user = new FormGroup({
      nom: new FormControl('',),
      prenom: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    });
  }
  montant = 0;
  addMoney(montant: number) {
    this.userService.postUserCredit(this.id, montant).subscribe(
      (data) => {
        console.log(data);
      })
  }

  removeMoney(montant: number) {
    this.userService.postUserDebit(this.id, montant).subscribe(
      (data) => {
        console.log(data);
      })
  }

  onClickSubmit(data:any ) {
    if(data.nom !=  undefined && data.nom != ""){
      this.user.name = data.nom;
    }
    if(data.prenom !== undefined && data.prenom != ""){
      this.user.firstname = data.prenom;
    }
    if(data.email != undefined && data.email != ""){
      this.user.email = data.email;
    }
    if(data.phone != undefined && data.phone != ""){
      this.user.phone = data.phone;
    }
    // this.user.name = data.nom;
    // this.user.firstname = data.prenom;
    // this.user.email = data.email;
    // this.user.phone = data.phone;
    console.log(this.user);
    this.userService.patchUpdateUser(this.id, this.user).subscribe(
      (data) => {
        console.log(data);
      })
    } 
}

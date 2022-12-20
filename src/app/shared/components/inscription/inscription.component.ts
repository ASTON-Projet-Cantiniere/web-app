import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inscription } from '../../models/inscription';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  constructor(private userService: UserService) { }

  inscription: Inscription = {

    name: "",
    firstname: "",
    email: "",
    password: "",
    sex: 10
  }
  ngOnInit(): void {
  }

  inscription_methode(){
    this.userService.putregisterUser(this.inscription).subscribe(
      resp => {
        console.log(resp);
      }
    )
  }
  

}

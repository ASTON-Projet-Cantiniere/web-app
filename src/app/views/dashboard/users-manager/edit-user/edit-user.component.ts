import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@shared/models/user.model';
import { Image } from '@shared/models/image.model';
import { UserService } from '@shared/services/user.service';
import { tap } from 'rxjs';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form_user !: FormGroup;
  public id: number = 0;
  public user: any;
  public image: any;;

  constructor(private route: ActivatedRoute, private userService: UserService, private toaster: ToastrService, private router: Router) {
  }


  ngOnInit(): void {
    //récupère l'id de l'utilisateur via l'url
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    //récupère l'utilisateur via son id
    this.user = this.userService.getUserByID(this.id).subscribe(
      (resp: User) => {
        this.user = resp;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error("Oups, le profil n'existe pas !")
        this.router.navigate(['/dashboard/users'])
      }
    )

    this.form_user = new FormGroup({
      //verifier les champs nom et prenom avec une longueur minimale de 3 caractères
      nom: new FormControl('', [Validators.minLength(3)]),
      prenom: new FormControl('', [Validators.minLength(3)]),
      // verifier le champ email  et phone avec une regex
      email: new FormControl('', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')),
      phone: new FormControl('', Validators.pattern('^[0-9]{10}$')),
    });
  }
  montant: number = 0;

  //ajouter de l'argent au compte utilisateur
  addMoney(montant: number) {
    //verifications du montant
    if (montant <= 0) {
      this.toaster.error("Le montant doit être supérieur à 0 !")
      return;
    }
    if (montant > 500) {
      this.toaster.error("Le montant doit être inférieur à 500 !")
      return;
    }
    this.userService.postUserCredit(this.id, montant).subscribe(
      (data) => {
        this.user.wallet += montant;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error("Oups, une erreur est survenue !")
      }
    )

  }

  //retirer de l'argent au compte utilisateur
  removeMoney(montant: number) {
    if (montant > this.user.wallet) {
      this.toaster.error("L'utilisateur n'a pas assez d'argent !")
      return;
    }
    this.userService.postUserDebit(this.id, montant).subscribe(
      (data) => {
        this.user.wallet -= montant;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error("Oups, une erreur est survenue !")
      }
    )
  }
  //modifier les informations de l'utilisateur
  onClickSubmit(data: any) {
    //verifications des champs du formulaire
    if (data.nom !== undefined && data.nom !== "") {
      this.user.name = data.nom;
    }
    if (data.prenom !== undefined && data.prenom !== "") {
      this.user.firstname = data.prenom;
    }
    if (data.email !== undefined && data.email !== "") {
      this.user.email = data.email;
    }
    if (data.phone !== undefined && data.phone !== "") {
      this.user.phone = data.phone;
    }
    //envoi des données à l'api
    this.userService.patchUpdateUser(this.id, this.user).subscribe(
      (data) => {
        this.toaster.success("Le profil a été modifié avec succès !")
        this.router.navigate(['/dashboard/users'])
      },
      (error: HttpErrorResponse) => {
        this.toaster.error("Oups, une erreur est survenue !")
      }
    )
  }
}


/**Production en attente */
// this.image = this.userService.getImgUserByID(this.id).subscribe(
      //   (resp) => {
      //     this.image = resp;
      //     console.log(this.image)
      //   },
      //   (error: HttpErrorResponse) => {
      //     this.toaster.warning("Oups, trop de beauté pour nous ! On ne va pas t'afficher :D")
      //   }
      // )

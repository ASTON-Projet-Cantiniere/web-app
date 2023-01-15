import { Component, OnInit } from '@angular/core';
import { MenuService } from '@shared/services/menu.service';
import { Menu } from '@shared/models/menu.model';
import { Meal } from '@shared/models/meal.model';
import { MealService } from '@shared/services/meal.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from "@angular/forms";
@Component({
  selector: 'app-menus-manager',
  templateUrl: './menus-manager.component.html',
  styleUrls: ['./menus-manager.component.scss']
})
export class MenusManagerComponent implements OnInit{
  menus: Menu[]= [];
  mealList: Meal[] = [];

  //Formulaire
  formAdd!: FormGroup;

  constructor(private menuService: MenuService, private mealService: MealService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.menuService.getAllMenu().subscribe((r: Menu[])=>{
      this.menus.push(...<[]>r);
    })
    this.mealService.getAllMeal().subscribe((r: Meal[]) =>{
      this.mealList.push(...<[]>r)
    })
    console.log(this.menus);

    this.formAdd = this.fb.group({
      description: [""],
      availableForWeeksAndDays: this.fb.array([]),
      label: [""],
      imagePath: [""],
      image64: [""],
      mealIds: this.fb.array([]),
      priceDF: [0]
    })
  }
  get availableForWeeksAndDays(){
    return this.formAdd.get("availableForWeeksAndDays") as FormArray;
  }
  get mealIds(){
    return this.formAdd.get("mealIds") as FormArray;
  }
  /**
   * Ajoute une date de disponibilité à la création de menu en cours
   */
  addAvailability() {
    const availableForm = this.fb.group({
      week: [0],
      day: [0],
    });
    this.availableForWeeksAndDays.push(availableForm);
    console.log(availableForm);
  }
  /**
   * Ajoute un plat au menu en cours de création
   */
  addMeals() {
    const ids = this.fb.group([]);
    this.mealIds.push(ids);
    console.log(ids);
  }

  /**
   * Ajoute un menu à la base de données
   */
  addMenu(){
    this.menuService.addMenu({
      "description": this.formAdd.value.description,
      "label": this.formAdd.value.label,
      "image":
        {
          "imagePath": this.formAdd.value.imagePath,
          "image64": this.formAdd.value.image64
        },
      "priceDF": this.formAdd.value.priceDF,
      "availableForWeeksAndDays": {
        "values": [...this.formAdd.value.availableForWeeksAndDays]
      },
      "mealIds": [
        ...this.formAdd.value.mealIds
      ]
    }).subscribe();
  }

  /**
   * Supprime le menu sélectionné
   * @param menuId number
   */
  public removeMenu(menuId: number){
    this.menuService.deleteMenu(menuId).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import json from './Ingredients.json';

export interface Ingredient {
  A: number;
  B: string;
  C: number;
  D: string;
  E: string;
  F: string;
  G: string;
  H: string;
  I: number;
}

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  Ingredients$1: Observable<string[]>;
  selectedIngredients = [];

  constructor() { }

  ngOnInit() {
    this.Ingredients$1 = this.getIngredients();
  }

getIngredients(term: string = null): Observable<string[]> {
  let items = getMockIngredients();
  // if (term) {
  //     items = items.filter(x => x.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
  // }
  return of(items).pipe(delay(500));
}

clearModel1() {
  this.selectedIngredients = [];
}
}

function getMockIngredients(){
  return json.map((ingredient:Ingredient)=>ingredient.B)
}
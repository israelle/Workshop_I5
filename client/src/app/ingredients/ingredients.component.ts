import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import json from './Ingredients.json';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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
  apiIngredients = "";
  API_URL = 'http://localhost:8000/Python-call'; // get ?ingredients=


    constructor(private http: HttpClient,
                private router: Router) { }

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
  goIA(){
      this.apiIngredients = this.selectedIngredients.join(', ');
      console.log(this.API_URL + '?ingredients='+this.apiIngredients);
      window.location.href =this.API_URL + '?ingredients='+this.apiIngredients;
  }
}

function getMockIngredients(){
  return json.map((ingredient:Ingredient)=>ingredient.B)
}
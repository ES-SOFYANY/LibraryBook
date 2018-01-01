import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component"
import {CartComponent} from "./cart/cart.component"

const APP_ROUTES:Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'panier', component: CartComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', component: HomeComponent}
];

export const Routing = RouterModule.forRoot(APP_ROUTES);

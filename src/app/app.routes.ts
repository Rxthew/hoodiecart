import { Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    {
        path: '',
        component: FormComponent
    },
    {
        path: 'store',
        component: StoreComponent
    },
    {
        path: 'cart',
        component: CartComponent
    }
];

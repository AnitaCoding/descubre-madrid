import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuBottomPage } from './menu-bottom.page';

const routes: Routes = [
  {
    path: '',
    component: MenuBottomPage,
    children:[
      {
        path: '',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'insignias',
        loadChildren: () => import('../insignias/insignias.module').then( m => m.InsigniasPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'ficha-item',
        loadChildren: () => import('../ficha-item/ficha-item.module').then( m => m.FichaItemPageModule)
      }
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuBottomPageRoutingModule {}

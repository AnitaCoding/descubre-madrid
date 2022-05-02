import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  /*se pone esto para que el menu salga en todas las páginas*/
  {
    path: '',
    loadChildren: () => import('./menu-bottom/menu-bottom.module').then(m => m.MenuBottomPageModule)
  },
  {
    path: 'ficha-item',
    loadChildren: () => import('./ficha-item/ficha-item.module').then( m => m.FichaItemPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'lista-visitados',
    loadChildren: () => import('./lista-visitados/lista-visitados.module').then( m => m.ListaVisitadosPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

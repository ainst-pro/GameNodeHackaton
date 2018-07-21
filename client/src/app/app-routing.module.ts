import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import {MainComponent} from './main/main.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full',
    },
    { path: 'game', component: MainComponent, data: { title: '' }, children: [

        ] },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

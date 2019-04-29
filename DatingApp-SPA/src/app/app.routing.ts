import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MemberListComponent} from './members/member-list/member-list.component';
import {MessagesComponent} from './messages/messages.component';
import {ListsComponent} from './lists/lists.component';
import {AuthGuard} from './_guards/auth.guard';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MemberDetailResolver} from './_resolvers/member-detail.resolver';
import {MemberListResolver} from './_resolvers/member-list.resolver';
import {MemberEditComponent} from './members/member-edit/member-edit.component';
import {MemberEditResolver} from './_resolvers/member-edit.resolver';
import {PreventUnsavedChangesGuard} from './_guards/prevent-unsaved-changes.guard';
import {ListsResolver} from './_resolvers/lists.resolver';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  // use one guard to protect multiple routes
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
      {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
      {
        path: 'member/edit',
        component: MemberEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
        resolve: {user: MemberEditResolver}
      },
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {
}

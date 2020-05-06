import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { EnterScreenComponent } from './enter-screen/enter-screen.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { ChatService } from './services/chat/chat.service';
import { UserService } from './services/user/user.service';



const appRoutes: Routes = [
  { path: 'enter-screen', component: EnterScreenComponent },
  { path: 'chat', component: ChatScreenComponent },
  { path: '', redirectTo: '/enter-screen', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    EnterScreenComponent,
    ChatScreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ChatService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

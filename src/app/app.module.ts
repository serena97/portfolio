import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { SectionExperienceComponent } from './section-experience/section-experience.component';
import { SectionWhoamiComponent } from './section-whoami/section-whoami.component';
import { SectionSideProjectsComponent } from './section-side-projects/section-side-projects.component';
import { ArtComponent } from './art/art.component';
import { WorkComponent } from './work/work.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    SectionExperienceComponent,
    SectionWhoamiComponent,
    SectionSideProjectsComponent,
    ArtComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

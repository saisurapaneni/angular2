import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { AuthService } from './user/auth.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
    EventsListComponent,
    EventThumbnailComponent,
    CreateEventComponent,
    EventListResolver,
    EventService,
    EventDetailsComponent,
    EventRouteActivator,
    CreateSessionComponent,
    SessionListComponent
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavbarComponent } from './nav/navbar.component'
import { ToastrService } from './common/toastr.service'
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
        ],
    declarations: [
        EventsAppComponent, 
        EventsListComponent,
        EventThumbnailComponent,
        NavbarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent
        ],
        providers: [
            EventService,
            ToastrService,
            EventRouteActivator,
            EventListResolver,
            AuthService,
            {
                provide: 'canDeactivateCreateEvent',
                useValue: checkDirtyState
            }
        ],
    bootstrap: [EventsAppComponent]

})

export class AppModule{

}

function checkDirtyState(component:CreateEventComponent){
    if(component.isDirty)
        return window.confirm('Are you sure you want cancel?')
    return true;

}
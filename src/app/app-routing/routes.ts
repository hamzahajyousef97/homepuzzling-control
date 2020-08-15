import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { UsersComponent } from '../users/users.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';
import { QuizesComponent } from '../quizes/quizes.component';
import { AddQuestionsComponent } from '../add-questions/add-questions.component';
import { EditQuizComponent } from '../edit-quiz/edit-quiz.component';
import { AddOptionsComponent } from '../add-options/add-options.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { EditQuestionComponent } from '../edit-question/edit-question.component';

import { AddYouKnowComponent } from '../add-you-know/add-you-know.component';
import { EditYouKnowComponent } from '../edit-you-know/edit-you-know.component';
import { YouKnowComponent } from '../you-know/you-know.component';

import { AddInformationComponent } from '../add-information/add-information.component';
import { EditInformationComponent } from '../edit-information/edit-information.component';
import { InformationComponent } from '../information/information.component';

import { AuthGuard } from '../auth/auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},

    { path: 'quizes', component: QuizesComponent , canActivate:[AuthGuard]},
    { path: 'add-quiz', component: AddQuizComponent, canActivate:[AuthGuard]},
    { path: 'add-questions/:name', component: AddQuestionsComponent, canActivate:[AuthGuard]},
    { path: 'add-options/:name/question/:id', component: AddOptionsComponent, canActivate:[AuthGuard]},
    { path: 'edit-quiz/:name', component: EditQuizComponent, canActivate:[AuthGuard]},
    { path: 'quizes/:name/edit-question/:id', component: EditQuestionComponent, canActivate:[AuthGuard]},

    { path: 'add-youKnow', component: AddYouKnowComponent, canActivate:[AuthGuard]},
    { path: 'edit-youKnow/:id', component: EditYouKnowComponent, canActivate:[AuthGuard]},
    { path: 'youKnow', component: YouKnowComponent, canActivate:[AuthGuard]},

    { path: 'add-information', component: AddInformationComponent, canActivate:[AuthGuard]},
    { path: 'edit-information/:id', component: EditInformationComponent, canActivate:[AuthGuard]},
    { path: 'informations', component: InformationComponent, canActivate:[AuthGuard]},

    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent, canActivate:[AuthGuard]},
    { path: 'add-user', component: AddUserComponent, canActivate:[AuthGuard]},
    // { path: 'feedbacks', component: FeedbackComponent, canActivate:[AuthGuard]},

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**',  component: PageNotFoundComponent}
];
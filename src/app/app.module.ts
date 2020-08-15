import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HighlightDirective } from './directives/highlight.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { FileInputAccessorModule } from "file-input-accessor";
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductComponent } from './product/product.component';
import { UserService } from './services/user.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorage } from '@angular/fire/storage';
import { FileSizePipe } from './pipes/file-size.pipe';
import { baseURL } from './shared/baseurl';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductResolver } from './resolver/product.resolver';
import { QuestionResolver } from './resolver/question.resolver';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizesComponent } from './quizes/quizes.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { QuizResolver } from './resolver/quiz.resolver';
import { AddOptionsComponent } from './add-options/add-options.component';
import { QuizService } from './services/quiz.service';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { AddYouKnowComponent } from './add-you-know/add-you-know.component';
import { EditYouKnowComponent } from './edit-you-know/edit-you-know.component';
import { YouKnowComponent } from './you-know/you-know.component';
import { AddInformationComponent } from './add-information/add-information.component';
import { EditInformationComponent } from './edit-information/edit-information.component';
import { InformationComponent } from './information/information.component';

const config = {
  apiKey: "AIzaSyCD99wQ4EP_9BUkYdRtNmHsGG-WRgOY1Co",
  authDomain: "home-puzzling.firebaseapp.com",
  databaseURL: "https://home-puzzling.firebaseio.com",
  projectId: "home-puzzling",
  storageBucket: "home-puzzling.appspot.com",
  messagingSenderId: "543716757119",
  appId: "1:543716757119:web:0d76e239e6cd2e45ad794a",
  measurementId: "G-EGR4S8JPZ5"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HighlightDirective,
    DashboardComponent,
    PageNotFoundComponent,
    EditProductComponent,
    ProductComponent,
    FileSizePipe,
    AddQuestionsComponent,
    AddQuizComponent,
    QuizesComponent,
    EditQuizComponent,
    AddOptionsComponent,
    EditQuestionComponent,
    LoginComponent,
    UsersComponent,
    AddUserComponent,
    AddYouKnowComponent,
    EditYouKnowComponent,
    YouKnowComponent,
    AddInformationComponent,
    EditInformationComponent,
    InformationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSnackBarModule,
    HttpClientModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    AngularFileUploaderModule,
    FileInputAccessorModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    

    AngularFireStorage,
    ProductResolver,
    QuestionResolver,
    QuizResolver,
    UserService,
    ProcessHTTPMsgService,
    AuthService,
    QuizService,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: 'BaseURL', useValue: baseURL },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

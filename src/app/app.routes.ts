import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarProfesorComponent } from './components/registrar-profesor/registrar-profesor.component';
import { CrearQuizComponent } from './components/crear-quiz/crear-quiz.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { CrearPreguntaComponent } from './components/crear-pregunta/crear-pregunta.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'registrarProfesor', component:RegistrarProfesorComponent},
    { path: 'creaQuiz', component:CrearQuizComponent},
    { path: 'preguntas', component:PreguntasComponent},
    { path: 'crear-pregunta', component:CrearPreguntaComponent},
    { path: "**", pathMatch: "full", redirectTo: "" }
    
];

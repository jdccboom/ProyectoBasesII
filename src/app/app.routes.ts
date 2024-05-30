import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarProfesorComponent } from './components/registrar-profesor/registrar-profesor.component';
import { CrearQuizComponent } from './components/crear-quiz/crear-quiz.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { CrearPreguntaComponent } from './components/crear-pregunta/crear-pregunta.component';
import { HomeComponent } from './components/home/home.component';
import { ExamenesPresentadoComponent } from './components/examenes-presentado/examenes-presentado.component';
import { PreguntasExamenComponent } from './components/preguntas-examen/preguntas-examen.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'examen-presentado/:examen_id', component: ExamenesPresentadoComponent },
            { path: 'crear-quiz/:materia_id', component: CrearQuizComponent },
            { path: 'preguntas/:examen_id', component: PreguntasComponent }
        ]
    },
    { path: "**", pathMatch: "full", redirectTo: "home" }

];

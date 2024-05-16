export class quizDTO{
    constructor(
        public categoria:string= "Films",
        public descripcion: string= "Quiz descripción",
        public titulo: string= "Untitle quiz ",
        public maximoPreguntas: number=1,
        public numPreguntasEstudiante: number=1,
        public tiempoExamen: number=1,
        public fecha:string =""
    ){

    }
}
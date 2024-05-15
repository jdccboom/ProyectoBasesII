export class PreguntaDTO {
   constructor(  
    public pregunta_id: number=0,
    public examen_id: number=0,
    public descripcion: any="",
    public tipo_pregunta: string="",
    public opciones: any[]=[{opcion_id:"", pregunta_id:"",descripcion:""}],
    public respuestaCorrecta: any[]=[],
    public respuestasUsuario: any[]=[],
    public es_publica: string=""
){}
}

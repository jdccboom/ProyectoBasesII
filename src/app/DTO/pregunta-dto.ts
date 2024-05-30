export class PreguntaDTO {
   constructor(  
    public pregunta_id: number=0,
    public examen_id: number=0,
    public descripcion: any="",
    public tipo_pregunta: string="",
    public opciones: any[]=[{opcion_id:"", pregunta_id:"",descripcion:""}],
    public respuesta_correcta: any[]=[],
    public respuestas_usuario: any[]=[],
    public es_publica: string="",
    public posicion: number=0,
    public porcentaje: number=0
){}
}

export class estadisticaPreguntaDTO{
    constructor(
    public posicion_pregunta: string="",
    public descripcion_pregunta: string="",
    public porcentaje_correctas: number=0,
    public numero_correctas: number=0,
    public numero_incorrectas: string="",
    public cantidad_respondidas: string=""
    ){}
  }
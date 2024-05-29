export class estadisticaPreguntaDTO{
    constructor(
    public posicion: string="",
    public descripcion: string="",
    public porcentaje_correctas: number=0,
    public num_respuestas_correctas: number=0,
    public num_respuestas_erroneas: string="",
    public total_respuestas: string=""
    ){}
  }
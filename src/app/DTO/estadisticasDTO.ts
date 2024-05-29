export class estadisticasDTO{
    constructor(
      public id: number,
      public fecha: string="",
      public nombre: string="",
      public apellido: string="",
      public puntaje_porcentaje: number=0,
      public puntaje: number=0,
      public tiempo: string="",
      public ipDireccion: string=""
    ){}
  }
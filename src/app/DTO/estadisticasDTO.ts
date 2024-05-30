export class estadisticasDTO{
    constructor(
      public examen_id: number,
      public fecha: string="",
      public nom_estudiante: string="",
      public ap_estudiante: string="",
      public puntaje_porcentaje: number=0,
      public nota: number=0,
      public tiempo: string="",
      public ip_estudiante: string=""
    ){}
  }
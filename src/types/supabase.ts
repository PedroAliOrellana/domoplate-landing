export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          email: string
          tipo_negocio: string | null
          fecha_registro: string | null
        }
        Insert: {
          id?: string
          email: string
          tipo_negocio?: string | null
          fecha_registro?: string | null
        }
        Update: {
          id?: string
          email?: string
          tipo_negocio?: string | null
          fecha_registro?: string | null
        }
      }
    }
  }
}

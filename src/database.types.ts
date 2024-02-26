export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointements: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          time_slot: number | null
          vehicle: number | null
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          time_slot?: number | null
          vehicle?: number | null
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          time_slot?: number | null
          vehicle?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "appointements_time_slot_fkey"
            columns: ["time_slot"]
            isOneToOne: false
            referencedRelation: "center_line_time_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointements_vehicle_fkey"
            columns: ["vehicle"]
            isOneToOne: false
            referencedRelation: "client_vehicles"
            referencedColumns: ["id"]
          }
        ]
      }
      appointment_types: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          type: Json | null
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: Json | null
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: Json | null
        }
        Relationships: []
      }
      center_days_off: {
        Row: {
          active: boolean | null
          center: number | null
          deleted: boolean | null
          from_date: string | null
          id: number
          metadata: Json | null
          to_date: string | null
        }
        Insert: {
          active?: boolean | null
          center?: number | null
          deleted?: boolean | null
          from_date?: string | null
          id?: never
          metadata?: Json | null
          to_date?: string | null
        }
        Update: {
          active?: boolean | null
          center?: number | null
          deleted?: boolean | null
          from_date?: string | null
          id?: never
          metadata?: Json | null
          to_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "center_days_off_center_fkey"
            columns: ["center"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          }
        ]
      }
      center_line_appointment_types: {
        Row: {
          active: boolean | null
          center_line: number | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          type: number | null
        }
        Insert: {
          active?: boolean | null
          center_line?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: number | null
        }
        Update: {
          active?: boolean | null
          center_line?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "center_line_appointment_types_center_line_fkey"
            columns: ["center_line"]
            isOneToOne: false
            referencedRelation: "center_lines"
            referencedColumns: ["id"]
          }
        ]
      }
      center_line_energy_types: {
        Row: {
          active: boolean | null
          center_line: number | null
          deleted: boolean | null
          energy: number | null
          id: number
          metadata: Json | null
        }
        Insert: {
          active?: boolean | null
          center_line?: number | null
          deleted?: boolean | null
          energy?: number | null
          id?: never
          metadata?: Json | null
        }
        Update: {
          active?: boolean | null
          center_line?: number | null
          deleted?: boolean | null
          energy?: number | null
          id?: never
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "center_line_energy_types_center_line_fkey"
            columns: ["center_line"]
            isOneToOne: false
            referencedRelation: "center_lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "center_line_energy_types_energy_fkey"
            columns: ["energy"]
            isOneToOne: false
            referencedRelation: "energy_types"
            referencedColumns: ["id"]
          }
        ]
      }
      center_line_time_slots: {
        Row: {
          active: boolean | null
          center_line: number | null
          day_of_week: number | null
          deleted: boolean | null
          from_time: string | null
          id: number
          metadata: Json | null
          to_time: string | null
        }
        Insert: {
          active?: boolean | null
          center_line?: number | null
          day_of_week?: number | null
          deleted?: boolean | null
          from_time?: string | null
          id?: never
          metadata?: Json | null
          to_time?: string | null
        }
        Update: {
          active?: boolean | null
          center_line?: number | null
          day_of_week?: number | null
          deleted?: boolean | null
          from_time?: string | null
          id?: never
          metadata?: Json | null
          to_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "center_line_time_slots_center_line_fkey"
            columns: ["center_line"]
            isOneToOne: false
            referencedRelation: "center_lines"
            referencedColumns: ["id"]
          }
        ]
      }
      center_line_vehicle_types: {
        Row: {
          active: boolean | null
          center_line: number | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          type: number | null
        }
        Insert: {
          active?: boolean | null
          center_line?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: number | null
        }
        Update: {
          active?: boolean | null
          center_line?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "center_line_vehicle_types_center_line_fkey"
            columns: ["center_line"]
            isOneToOne: false
            referencedRelation: "center_lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "center_line_vehicle_types_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "vehicle_types"
            referencedColumns: ["id"]
          }
        ]
      }
      center_lines: {
        Row: {
          active: boolean | null
          center: number | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          name: Json | null
        }
        Insert: {
          active?: boolean | null
          center?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          name?: Json | null
        }
        Update: {
          active?: boolean | null
          center?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          name?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "center_lines_center_fkey"
            columns: ["center"]
            isOneToOne: false
            referencedRelation: "centers"
            referencedColumns: ["id"]
          }
        ]
      }
      centers: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          id: number
          manager: number | null
          metadata: Json | null
          provider: string | null
          support: number | null
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          manager?: number | null
          metadata?: Json | null
          provider?: string | null
          support?: number | null
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          manager?: number | null
          metadata?: Json | null
          provider?: string | null
          support?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "centers_manager_fkey"
            columns: ["manager"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "centers_provider_fkey"
            columns: ["provider"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "centers_support_fkey"
            columns: ["support"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          }
        ]
      }
      cities: {
        Row: {
          active: boolean | null
          country: number | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          name: Json | null
        }
        Insert: {
          active?: boolean | null
          country?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          name?: Json | null
        }
        Update: {
          active?: boolean | null
          country?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          name?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          }
        ]
      }
      client_vehicles: {
        Row: {
          active: boolean | null
          brand: number | null
          client: string | null
          deleted: boolean | null
          energy: number | null
          id: number
          metadata: Json | null
          type: number | null
        }
        Insert: {
          active?: boolean | null
          brand?: number | null
          client?: string | null
          deleted?: boolean | null
          energy?: number | null
          id?: never
          metadata?: Json | null
          type?: number | null
        }
        Update: {
          active?: boolean | null
          brand?: number | null
          client?: string | null
          deleted?: boolean | null
          energy?: number | null
          id?: never
          metadata?: Json | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "client_vehicles_brand_fkey"
            columns: ["brand"]
            isOneToOne: false
            referencedRelation: "vehicle_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_vehicles_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_vehicles_energy_fkey"
            columns: ["energy"]
            isOneToOne: false
            referencedRelation: "energy_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_vehicles_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "vehicle_types"
            referencedColumns: ["id"]
          }
        ]
      }
      clients: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          id: string
          person: number | null
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          id: string
          person?: number | null
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          id?: string
          person?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_addresses: {
        Row: {
          active: boolean | null
          city: number | null
          contact: number | null
          deleted: boolean | null
          id: number
          metadata: Json | null
        }
        Insert: {
          active?: boolean | null
          city?: number | null
          contact?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
        }
        Update: {
          active?: boolean | null
          city?: number | null
          contact?: number | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_addresses_city_fkey"
            columns: ["city"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_addresses_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_infos: {
        Row: {
          active: boolean | null
          contact: number | null
          deleted: boolean | null
          id: number
          type: number | null
          value: string | null
        }
        Insert: {
          active?: boolean | null
          contact?: number | null
          deleted?: boolean | null
          id?: never
          type?: number | null
          value?: string | null
        }
        Update: {
          active?: boolean | null
          contact?: number | null
          deleted?: boolean | null
          id?: never
          type?: number | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_infos_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_infos_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "contact_types"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_types: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          name: Json | null
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          name?: Json | null
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          name?: Json | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          id: number
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
        }
        Relationships: []
      }
      countries: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          name: Json | null
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          name?: Json | null
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          name?: Json | null
        }
        Relationships: []
      }
      energy_types: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          type: Json | null
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: Json | null
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: Json | null
        }
        Relationships: []
      }
      holidays: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          from_date: string | null
          id: number
          metadata: Json | null
          name: Json | null
          to_date: string | null
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          from_date?: string | null
          id?: never
          metadata?: Json | null
          name?: Json | null
          to_date?: string | null
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          from_date?: string | null
          id?: never
          metadata?: Json | null
          name?: Json | null
          to_date?: string | null
        }
        Relationships: []
      }
      persons: {
        Row: {
          contact: number | null
          id: number
          metadata: Json | null
        }
        Insert: {
          contact?: number | null
          id?: never
          metadata?: Json | null
        }
        Update: {
          contact?: number | null
          id?: never
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "persons_contact_fkey"
            columns: ["contact"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          }
        ]
      }
      providers: {
        Row: {
          id: string
          metadata: Json | null
        }
        Insert: {
          id: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "providers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      vehicle_brands: {
        Row: {
          active: boolean | null
          brand: Json | null
          deleted: boolean | null
          id: number
          metadata: Json | null
        }
        Insert: {
          active?: boolean | null
          brand?: Json | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
        }
        Update: {
          active?: boolean | null
          brand?: Json | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
        }
        Relationships: []
      }
      vehicle_types: {
        Row: {
          active: boolean | null
          deleted: boolean | null
          id: number
          metadata: Json | null
          type: Json | null
        }
        Insert: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: Json | null
        }
        Update: {
          active?: boolean | null
          deleted?: boolean | null
          id?: never
          metadata?: Json | null
          type?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

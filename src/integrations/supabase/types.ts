export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          child_id: string
          created_at: string | null
          id: string
          is_present: boolean | null
          mahfil_id: string
          points_earned: number | null
          recorded_by: string | null
          session_date: string
        }
        Insert: {
          child_id: string
          created_at?: string | null
          id?: string
          is_present?: boolean | null
          mahfil_id: string
          points_earned?: number | null
          recorded_by?: string | null
          session_date: string
        }
        Update: {
          child_id?: string
          created_at?: string | null
          id?: string
          is_present?: boolean | null
          mahfil_id?: string
          points_earned?: number | null
          recorded_by?: string | null
          session_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_mahfil_id_fkey"
            columns: ["mahfil_id"]
            isOneToOne: false
            referencedRelation: "mahafil"
            referencedColumns: ["id"]
          },
        ]
      }
      child_rewards: {
        Row: {
          child_id: string
          delivered: boolean | null
          delivered_at: string | null
          id: string
          redeemed_at: string | null
          reward_id: string
        }
        Insert: {
          child_id: string
          delivered?: boolean | null
          delivered_at?: string | null
          id?: string
          redeemed_at?: string | null
          reward_id: string
        }
        Update: {
          child_id?: string
          delivered?: boolean | null
          delivered_at?: string | null
          id?: string
          redeemed_at?: string | null
          reward_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_rewards_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_rewards_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          age: number
          avatar_url: string | null
          created_at: string | null
          enrollment_date: string | null
          first_name: string
          gender: Database["public"]["Enums"]["child_gender"]
          id: string
          last_name: string
          mahfil_id: string | null
          parent_id: string
          total_points: number | null
          updated_at: string | null
        }
        Insert: {
          age: number
          avatar_url?: string | null
          created_at?: string | null
          enrollment_date?: string | null
          first_name: string
          gender: Database["public"]["Enums"]["child_gender"]
          id?: string
          last_name: string
          mahfil_id?: string | null
          parent_id: string
          total_points?: number | null
          updated_at?: string | null
        }
        Update: {
          age?: number
          avatar_url?: string | null
          created_at?: string | null
          enrollment_date?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["child_gender"]
          id?: string
          last_name?: string
          mahfil_id?: string | null
          parent_id?: string
          total_points?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "children_mahfil_id_fkey"
            columns: ["mahfil_id"]
            isOneToOne: false
            referencedRelation: "mahafil"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluations: {
        Row: {
          child_id: string
          created_at: string | null
          evaluation_date: string | null
          evaluator_id: string
          hadith_grade: Database["public"]["Enums"]["evaluation_grade"] | null
          id: string
          mahfil_id: string | null
          nahj_grade: Database["public"]["Enums"]["evaluation_grade"] | null
          notes: string | null
          quran_concepts: Database["public"]["Enums"]["evaluation_grade"] | null
          quran_memorization:
            | Database["public"]["Enums"]["evaluation_grade"]
            | null
          quran_recitation:
            | Database["public"]["Enums"]["evaluation_grade"]
            | null
          quran_tajweed: Database["public"]["Enums"]["evaluation_grade"] | null
          total_score: number | null
        }
        Insert: {
          child_id: string
          created_at?: string | null
          evaluation_date?: string | null
          evaluator_id: string
          hadith_grade?: Database["public"]["Enums"]["evaluation_grade"] | null
          id?: string
          mahfil_id?: string | null
          nahj_grade?: Database["public"]["Enums"]["evaluation_grade"] | null
          notes?: string | null
          quran_concepts?:
            | Database["public"]["Enums"]["evaluation_grade"]
            | null
          quran_memorization?:
            | Database["public"]["Enums"]["evaluation_grade"]
            | null
          quran_recitation?:
            | Database["public"]["Enums"]["evaluation_grade"]
            | null
          quran_tajweed?: Database["public"]["Enums"]["evaluation_grade"] | null
          total_score?: number | null
        }
        Update: {
          child_id?: string
          created_at?: string | null
          evaluation_date?: string | null
          evaluator_id?: string
          hadith_grade?: Database["public"]["Enums"]["evaluation_grade"] | null
          id?: string
          mahfil_id?: string | null
          nahj_grade?: Database["public"]["Enums"]["evaluation_grade"] | null
          notes?: string | null
          quran_concepts?:
            | Database["public"]["Enums"]["evaluation_grade"]
            | null
          quran_memorization?:
            | Database["public"]["Enums"]["evaluation_grade"]
            | null
          quran_recitation?:
            | Database["public"]["Enums"]["evaluation_grade"]
            | null
          quran_tajweed?: Database["public"]["Enums"]["evaluation_grade"] | null
          total_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluations_mahfil_id_fkey"
            columns: ["mahfil_id"]
            isOneToOne: false
            referencedRelation: "mahafil"
            referencedColumns: ["id"]
          },
        ]
      }
      mahafil: {
        Row: {
          address: string | null
          age_max: number | null
          age_min: number | null
          capacity: number | null
          city_id: string
          created_at: string | null
          days_of_week: string[] | null
          description: string | null
          end_time: string | null
          features: string[] | null
          gender: Database["public"]["Enums"]["mahfil_gender"] | null
          id: string
          image_url: string | null
          name: string
          province_id: string
          start_time: string | null
          status: Database["public"]["Enums"]["mahfil_status"] | null
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          age_max?: number | null
          age_min?: number | null
          capacity?: number | null
          city_id: string
          created_at?: string | null
          days_of_week?: string[] | null
          description?: string | null
          end_time?: string | null
          features?: string[] | null
          gender?: Database["public"]["Enums"]["mahfil_gender"] | null
          id?: string
          image_url?: string | null
          name: string
          province_id: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["mahfil_status"] | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          age_max?: number | null
          age_min?: number | null
          capacity?: number | null
          city_id?: string
          created_at?: string | null
          days_of_week?: string[] | null
          description?: string | null
          end_time?: string | null
          features?: string[] | null
          gender?: Database["public"]["Enums"]["mahfil_gender"] | null
          id?: string
          image_url?: string | null
          name?: string
          province_id?: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["mahfil_status"] | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      memorized_surahs: {
        Row: {
          child_id: string
          created_at: string | null
          id: string
          is_memorized: boolean | null
          points_earned: number | null
          surah_number: number
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          child_id: string
          created_at?: string | null
          id?: string
          is_memorized?: boolean | null
          points_earned?: number | null
          surah_number: number
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          child_id?: string
          created_at?: string | null
          id?: string
          is_memorized?: boolean | null
          points_earned?: number | null
          surah_number?: number
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memorized_surahs_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city_id: string | null
          created_at: string | null
          first_name: string
          id: string
          last_name: string
          phone: string | null
          province_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          city_id?: string | null
          created_at?: string | null
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          province_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          city_id?: string | null
          created_at?: string | null
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          province_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rewards: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          points_required: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          points_required: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          points_required?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      child_gender: "male" | "female"
      evaluation_grade: "excellent" | "good" | "average" | "needs_practice"
      mahfil_gender: "boys" | "girls" | "mixed"
      mahfil_status: "active" | "inactive" | "upcoming"
      user_role: "admin" | "teacher" | "assistant" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      child_gender: ["male", "female"],
      evaluation_grade: ["excellent", "good", "average", "needs_practice"],
      mahfil_gender: ["boys", "girls", "mixed"],
      mahfil_status: ["active", "inactive", "upcoming"],
      user_role: ["admin", "teacher", "assistant", "parent"],
    },
  },
} as const

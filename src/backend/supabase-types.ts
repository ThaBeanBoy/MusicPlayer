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
      artist: {
        Row: {
          cover_img_url: string | null
          created_at: string
          description: string
          exernal_link: string | null
          id: number
          name: string
          profile_img_url: string | null
        }
        Insert: {
          cover_img_url?: string | null
          created_at?: string
          description: string
          exernal_link?: string | null
          id?: number
          name: string
          profile_img_url?: string | null
        }
        Update: {
          cover_img_url?: string | null
          created_at?: string
          description?: string
          exernal_link?: string | null
          id?: number
          name?: string
          profile_img_url?: string | null
        }
        Relationships: []
      }
      playlist: {
        Row: {
          cover_img_url: string | null
          created_at: string
          created_by: string
          description: string | null
          id: number
          title: string
        }
        Insert: {
          cover_img_url?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          cover_img_url?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      playlist_songs: {
        Row: {
          index: number
          playlist_id: number
          song_id: number
        }
        Insert: {
          index: number
          playlist_id: number
          song_id: number
        }
        Update: {
          index?: number
          playlist_id?: number
          song_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "playlist_songs_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_songs_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          }
        ]
      }
      song: {
        Row: {
          cover_img_url: string | null
          created_at: string
          duration: number
          id: number
          lyrics_url: string
          song_url: string
          title: string
        }
        Insert: {
          cover_img_url?: string | null
          created_at?: string
          duration: number
          id?: number
          lyrics_url: string
          song_url: string
          title: string
        }
        Update: {
          cover_img_url?: string | null
          created_at?: string
          duration?: number
          id?: number
          lyrics_url?: string
          song_url?: string
          title?: string
        }
        Relationships: []
      }
      song_artists: {
        Row: {
          artist_id: number
          collaboration: boolean
          song_id: number
        }
        Insert: {
          artist_id: number
          collaboration: boolean
          song_id: number
        }
        Update: {
          artist_id?: number
          collaboration?: boolean
          song_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "song_artists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_artists_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          }
        ]
      }
      user_info: {
        Row: {
          id: string
          username: string
        }
        Insert: {
          id: string
          username: string
        }
        Update: {
          id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_info_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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

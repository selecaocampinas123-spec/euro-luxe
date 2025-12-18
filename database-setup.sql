-- ========================================
-- EURO LUXE - SUPABASE DATABASE SCHEMA
-- ========================================

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Etapa 1: Dados Básicos
  nome TEXT NOT NULL,
  idade INTEGER NOT NULL CHECK (idade >= 18),
  email TEXT NOT NULL UNIQUE,
  estado_pais TEXT NOT NULL,
  whatsapp TEXT,
  
  -- Etapa 2: Perfil Pessoal
  descricao TEXT,
  busca TEXT,
  idiomas TEXT[],
  
  -- Etapa 3: Preferências de Interação
  preferencias TEXT[],
  
  -- Etapa 4: Perfil Visual
  fotos TEXT[], -- URLs das imagens no Supabase Storage
  
  -- Etapa 5: Confirmação
  termos_aceitos BOOLEAN DEFAULT FALSE,
  maior_18 BOOLEAN DEFAULT FALSE,
  
  -- Controle de Análise
  tipo_analise TEXT CHECK (tipo_analise IN ('padrão', 'prioritária')),
  status_analise TEXT DEFAULT 'pendente' CHECK (status_analise IN ('pendente', 'em_analise', 'aprovado', 'recusado')),
  pagamento_confirmado BOOLEAN DEFAULT FALSE,
  data_envio TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_status_idx ON profiles(status_analise);
CREATE INDEX IF NOT EXISTS profiles_tipo_analise_idx ON profiles(tipo_analise);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON profiles(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for signup)
CREATE POLICY "Allow public inserts" ON profiles
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- ========================================
-- STORAGE BUCKET SETUP
-- ========================================

-- Create storage bucket for profile photos
-- Run this in Supabase Dashboard > Storage OR via SQL if you have permissions

INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'profile-photos');

CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile-photos');

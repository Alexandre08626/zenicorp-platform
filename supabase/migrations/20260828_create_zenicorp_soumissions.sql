-- ============================================================
-- ZeniCorp — Table des soumissions (zenicorp_soumissions)
-- À exécuter dans le SQL Editor de Supabase (Dashboard → SQL Editor)
-- Projet Supabase utilisé par zenicorp-platform (le même que le dashboard Zenitech).
-- ============================================================

create table if not exists public.zenicorp_soumissions (
  id uuid primary key default gen_random_uuid(),
  prenom text,
  nom text,
  email text not null,
  telephone text,
  adresse text,
  ville text,
  code_postal text,
  division text not null,
  type_projet text,
  description text,
  statut text default 'nouveau',
  paylink_id text,
  paylink_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index pour retrouver les soumissions par division et par email
create index if not exists zenicorp_soumissions_division_idx on public.zenicorp_soumissions (division);
create index if not exists zenicorp_soumissions_email_idx on public.zenicorp_soumissions (email);
create index if not exists zenicorp_soumissions_created_idx on public.zenicorp_soumissions (created_at desc);

-- RLS : activé, mais les accès se font via la clé service role (bypass RLS).
-- On garde une politique simple de lecture/écriture pour les rôles authentifiés si besoin.
alter table public.zenicorp_soumissions enable row level security;

-- Politique : personne ne peut lire/écrire via anon (accès via service role uniquement).
create policy "soumissions_service_role_all"
  on public.zenicorp_soumissions
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
-- Create leads table
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  contact_type text not null check (contact_type in ('whatsapp', 'email')),
  business_need text,
  message text,
  source text not null default 'meta_ads',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'closed', 'lost')),
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table leads enable row level security;

-- Policy for INSERT (anon role can insert)
create policy "Allow anonymous users to insert leads"
  on leads for insert
  to anon
  with check (true);

-- Policy for SELECT, UPDATE, DELETE (only authenticated role)
create policy "Allow authenticated users full access to leads"
  on leads for all
  to authenticated
  using (true)
  with check (true);

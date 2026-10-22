-- Per-module downloads (Smart Factory's MES cores and extension modules).
-- NULL module_id means the product as a whole.
alter table expo.downloads add column if not exists module_id text;

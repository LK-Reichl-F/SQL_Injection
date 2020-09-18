create table benutzer (
	id serial primary key,
	name text unique,
	passwort text
);

grant all on benutzer to sql_injection;
grant all on benutzer_id_seq to sql_injection;
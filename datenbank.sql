create table benutzer (
	id serial primary key,
	name text unique,
	passwort text
);

grant all on benutzer to sql_injection;
grant all on benutzer_id_seq to sql_injection;

create table informationen (
	benutzerId integer references benutzer(id),
	schluessel text,
	wert text,
	primary key(benutzerid, schluessel)
);
grant all on informationen to sql_injection;

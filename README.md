# SQL_Injection

Diese Web-Anwendung soll Angriffe mit Hilfe einer [SQL-Injection](https://de.wikipedia.org/wiki/SQL-Injection)
ermöglichen und illustrieren.

## Normale Benutzung

Nach dem Aufruf der Aufruf der Seite sieht man alle Funktionen auf einer Seite:

* Man kann eine\*n neue\*n Benutzer\*in mit Namen und Passwort anlegen.
* Mit diesem Namen und Passwort kann man sich anmelden. Bei der Anmeldung wird allerdings nur
  überprüft, ob Benutzername und Passwort zusammenpassen und man erhält ein entsprechendes Ergebnis.
* Informationen abspeichern: Man kann auf dem Server unter einem Suchbegriff eine Information abspeichern.
  Dabei sind beliebig viele Suchbegriffe mit zugehöriger Information möglich. Jede\*r Benutzer\*in kann
  seine eigenen Suchbegriffe festlegen. Suchbegriffe anderer Benutzer\*innen spielen dabei keine Rolle.
* Information abfragen: Hier gibt man einen Suchbegriff ein und bekommt die zugehörige Information als
  Ergebnis zurück. Suchbegriffe anderer Benutzer\*innen lassen sich eigentlich nicht abfragen.
  
### Hinweis:

Um Informationen abspeichern und abfragen zu können muss im Anmelde-Bereich der richtige Benutzername
und sein Passwort stehen.

Diese Web-Anwendung verwendet eine [REST-Schnittstelle](https://de.wikipedia.org/wiki/Representational_State_Transfer)
zum Zugriff auf die Datenbank. Weil REST zustandslos ist, wird bei jeder Anfrage an die Datenbank der Benutzername
und das Passwort aus dem Anmeldebereich mitgeschickt.

Der Aufruf der REST-Schnittstelle wird auf der Seite angezeigt.
  
## Angriffe

Alle Angriffe basieren darauf, dass der Text des Eingabefelds ungeprüft und unverändert in die SQL-Anweisung übernommen wird
die an den Datenbankserver geschickt wird.

### Anmeldung ohne Kenntnis des Passworts

Wenn man nachstehenden Text in das Feld `Passwort` eingibt, wird man als Benutzer `Hugo` angemeldet, ohne sein Passwort kennen.

```sql
' or name='Hugo
```

#### Erklärung

Im JavaScript-Programm wird die Datenbankabfrage wie folgt erstellt

```javascript
`select from benutzer where name='${name}' and passwort='${passwort}'`
```

Setzt man nun einen `beliebigen Namen` für `${name}` und `' or name='Hugo` für `${passwort}` so erhält man folgende SQL-Anweisung
für die Datenbank:

```sql
select from benutzer where name='beliebigen Namen' and passwort='' or name='Hugo'
```

und wird als Benutzer `Hugo` angemeldet.

### Abfrage beliebiger Informationen

Zunächst wieder die Zusammenstellung der SQL-Anweisung für die Datenbank:

```javascript
`select wert from benutzer, informationen where schluessel='${key}' and name='${name}' and passwort='${passwort}'`
```

Auch hier kann man am einfachsten angreifen, in dem man für `${passwort}` Datenbank-Code schreibt, der die 
voherigen Bedingungen bedeutungslos macht und statt dessen eigene Bedingungen setzt. Zum Beispiel:

```sql
' or schluessel='Geheimnis' and name='Irene
```

### Abfrage aller Benutzernamen und Passwörter

Man kann nicht nur aus der ursprünglichen Tabelle Daten abfragen, sondern auch diese Abfrage
mit einer Abfrage aus einer anderen Tabelle kombinieren, so dass man beispielsweise alle Benutzernamen
und Passwörter ansehen kann:

```sql
' union select name || ': ' || passwort from benutzer where 'x'='x
```
## Nachwort

Natürlich lassen sich diese Angriffe relativ einfach verhindern, zum Beispiel durch Verwendung von
sogenannten "Prepared Statements".

Es braucht also nur eine\*n aufmerksame\*n Programmier\*in um diese Fehler zu vermeiden. Aber Menschen
machen Fehler…
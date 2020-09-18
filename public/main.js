"use strict";

async function anlegen() {
    const name = document.getElementById("anlegenName").value;
    const passwort = document.getElementById("anlegenPasswort").value;
    const url = new URL("http://10.17.1.130:3001/anlegen");
    url.searchParams.append("name", name);
    url.searchParams.append("passwort", passwort);
    let ergebnis;
    try {
        const versprechen = await fetch(url);
        const json = await versprechen.json();
        ergebnis = JSON.stringify(json);
    } catch (ausnahme) {
        ergebnis = ausnahme;
    }
    document.getElementById("anlegenErgebnis").innerText = ergebnis;
}


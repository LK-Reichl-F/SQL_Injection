"use strict";

async function anlegen() {
    const name = document.getElementById("anlegenName").value;
    const passwort = document.getElementById("anlegenPasswort").value;
    const url = new URL("http://10.17.1.130:3001/anlegen");
    url.searchParams.append("name", name);
    url.searchParams.append("passwort", passwort);
    const urlString = url.toString();
    document.getElementById("anlegenAufruf").innerHTML = `<a href="${urlString}">${urlString}</a>`
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

async function anmelden() {
    const name = document.getElementById("anmeldenName").value;
    const passwort = document.getElementById("anmeldenPasswort").value;
    const url = new URL("http://10.17.1.130:3001/anmelden");
    url.searchParams.append("name", name);
    url.searchParams.append("passwort", passwort);
    const urlString = url.toString();
    document.getElementById("anmeldenAufruf").innerHTML = `<a href="${urlString}">${urlString}</a>`
    let ergebnis;
    try {
        const versprechen = await fetch(url);
        const json = await versprechen.json();
        ergebnis = JSON.stringify(json);
    } catch (ausnahme) {
        ergebnis = ausnahme;
    }
    document.getElementById("anmeldenErgebnis").innerText = ergebnis;
}

async function abspeichern() {
    const name = document.getElementById("anmeldenName").value;
    const passwort = document.getElementById("anmeldenPasswort").value;
    const key = document.getElementById('speichernKey').value;
    const value = document.getElementById('speichernValue').value;
    const url = new URL("http://10.17.1.130:3001/abspeichern");
    url.searchParams.append("name", name);
    url.searchParams.append("passwort", passwort);
    url.searchParams.append("key", key);
    url.searchParams.append("value", value);
    const urlString = url.toString();
    document.getElementById("abspeichernAufruf").innerHTML = `<a href="${urlString}">${urlString}</a>`
    let ergebnis;
    try {
        const versprechen = await fetch(url);
        const json = await versprechen.json();
        ergebnis = JSON.stringify(json);
    } catch (ausnahme) {
        ergebnis = ausnahme;
    }
    document.getElementById("abspeichernErgebnis").innerText = ergebnis;
}

async function abfragen() {
    const name = document.getElementById("anmeldenName").value;
    const passwort = document.getElementById("anmeldenPasswort").value;
    const key = document.getElementById('abfrageKey').value;
    const url = new URL("http://10.17.1.130:3001/abfragen");
    url.searchParams.append("name", name);
    url.searchParams.append("passwort", passwort);
    url.searchParams.append("key", key);
    const urlString = url.toString();
    document.getElementById("abfragenAufruf").innerHTML = `<a href="${urlString}">${urlString}</a>`
    let ergebnis;
    try {
        console.log(url.toString());
        const versprechen = await fetch(url);
        const json = await versprechen.json();
        ergebnis = JSON.stringify(json);
    } catch (ausnahme) {
        ergebnis = ausnahme;
    }
    document.getElementById("abfragenErgebnis").innerText = ergebnis;
}

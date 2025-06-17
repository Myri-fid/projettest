async function fetchData() {
    const query = document.getElementById("search").value;

    if (!query) {
        document.getElementById("results").innerHTML = "<p>Numero SIREN </p>";
        return;
    }

    try {
        console.log("Requête envoyée :", query);
        const response = await fetch(`/api/bodacc?q=${query}`);
        const data = await response.json();

        console.log("Données API :", data);

        let uniqueResults = new Set(); //  des valeurs uniques
        let output = "<h2>Résultats :</h2>";

        if (data.records && data.records.length > 0) {
            data.records.forEach(record => {
                let entreprise = record.fields?.commercant || "Nom introuvable";
                let siren = record.fields?.registre?.split(",")[0] || "SIREN introuvable";
                let ville = record.fields?.ville || "Ville inconnue";
                let lien = record.fields?.url_complete || "#";

                let key = `${entreprise}-${siren}-${ville}`; // Création clé

                if (!uniqueResults.has(key)) { // Vérifie si la clé existe déjà
                    uniqueResults.add(key); // Ajoute l'entreprise
                    output += `<p><strong>${entreprise}</strong> - SIREN: ${siren} - ${ville}</p>`;
                    output += `<p><a href="${lien}" target="_blank">Annonce complète</a></p>`;
                }
            });
        } else {
            output += "<p>Aucun résultat trouvé.</p>";
        }

        document.getElementById("results").innerHTML = output;
    } catch (error) {
        console.error("Erreur :", error);
        document.getElementById("results").innerHTML = "<p>Erreur</p>";
    }
}

import casual from "casual-browserify";
const TOTAL_AGENTS_RANDOM = 990;
export const FILTRES_RECHERCHE = [
  { value: "FILTER_0", name: "Tous" },
  {
    value: "FILTER_1",
    name: "Personnels arrivant en fin de contrat entre date A et date B"
  },
  {
    value: "FILTER_2",
    name: "Personnels en fin de détachement, en fin de mise à disponibilité ou en fin de mise à disposition."
  },
  {
    value: "FILTER_3",
    name: "Personnels en fin de détachement, en fin de mise à disponibilité ou en fin de mise à disposition entre date A et date B."
  },
  { value: "FILTER_4", name: "Vacataires" },
  { value: "FILTER_5", name: "Hébergés" },
  { value: "FILTER_6", name: "Agents" }
];
FILTRES_RECHERCHE.map(function(Item, index) {
  index++;
  Item.type = "RECHERCHE";
  Item.value = "FILTRE_" + index;
  Item.description = casual.sentences(3);
  Item.key = casual.uuid;
  Item.beta = casual.random_element([true, false]);

  Item.Agents = [];

  let random = casual.random * TOTAL_AGENTS_RANDOM;
  for (let i = 1; i <= random; i++) {
    Item.Agents.push({
      key: casual.uuid,
      nom: casual.full_name + " [" + Item.value + "]",
      mangue_id: casual.uuid,
      situation: casual.random_element(["vacataire", "hébergé", "fonctionnaire"]),
      dateFinSituation: casual.date("YYYY-MM-DD")
    });
  }

  return Item;
});

export const FILTRES_INDICATEURS = [
  { name: "Identifier les doublons" },
  { name: "Identifier les personnels sans contrat" },
  { name: "Identifier les comptes avec infos manquantes" },
  { name: "Identifier les comptes avec des incohérences dans les infos" },
  { name: "Identifier divers cas (arrêts longues maladies etc)" },
  { name: "Lister les personnels actifs dans Mangue et sans compte LDAP" },
  { name: "Lister les personnels actifs dans Mangue et sans compte AD" },
  {
    name: "Lister les personnels actifs dans le LDAP mais hors contrat dans Mangue (inactifs)"
  },
  {
    name: "Lister les personnels actifs dans le AD mais hors contrat dans Mangue (inactifs)"
  },
  {
    name: "Lister les personnels actifs dans Partage mais hors contrat dans Mangue (inactifs)"
  },
  {
    name: "Lister les personnels actifs dans X applications mais hors contrat dans Mangue"
  },
  {
    name: "Lister les personnels actifs dans X applications mais hors contrat dans Mangue"
  }
];

FILTRES_INDICATEURS.map(function(Item, index) {
  index++;
  Item.type = "INDICATEUR";

  Item.beta = casual.random_element([true, false]);
  Item.value = "FILTRE_" + index;
  Item.description = casual.sentences(3);
  Item.key = casual.uuid;
  Item.status = casual.random_element(["ERROR", "WARNING", "SUCCESS"]);

  Item.Agents = [];
  if (Item.value !== "FILTRE_4") {
    let random = casual.random * TOTAL_AGENTS_RANDOM;

    for (let i = 1; i <= random; i++) {
      Item.Agents.push({
        // resolutionPlanifiee: casual.random_element([true, false]),
        key: casual.uuid,
        nom: casual.full_name + " [" + Item.value + "]",
        mangue_id: casual.uuid,
        situation: casual.random_element(["vacataire", "hébergé", "fonctionnaire"]),
        dateFinSituation: casual.date("YYYY-MM-DD")
      });
    }
  }

  return Item;
});
//console.log(FILTRES_RECHERCHE);
//console.log(FILTRES_INDICATEURS);
//export const FILTRES_INDICATEURS = [];

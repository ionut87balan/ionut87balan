// clasa Procesor, care defineste una dintre proprietatile clasei Produs Electronic
class Procesor {
    frecventa;
    numar_cores;
    pret;

    constructor(frecventa, numar_cores, pret) {
        this.frecventa = frecventa;
        this.numar_cores = numar_cores;
        this.pret = pret;
    }

    // aceasta functie se gaseste pe clasa Procesor si primeste un argument
    // de tip comparator si afiseaza in consola daca frecventa depaseste una minima
    verificareFrecventa = (comparator) => {
        if (this.frecventa > comparator) {
            console.log(
                "da, freceventa de " + this.frecventa + " este suficienta."
            );
        } else {
            console.log(
                "nu, freceventa de " + this.frecventa + " nu este suficienta."
            );
        }
    };
}

// clasa parinte
class ProdusElectronic {
    nume;
    ram;
    stocare;
    tip_stocare;
    ecran;
    // acest procesor este de tipul clasei Procesor
    procesor;

    constructor(nume, ram, stocare, tip_stocare, monitor, procesor) {
        this.nume = nume;
        this.ram = ram;
        this.stocare = stocare;
        this.tip_stocare = tip_stocare;
        this.ecran = monitor;
        this.procesor = procesor;
    }

    // functia de setare pentru procesor
    setProcesor = function (procesor) {
        this.procesor = procesor;
    };
}

// clasa Telefon este subclasa care extinde clasa Produs Electronic
class Telefon extends ProdusElectronic {
    nr_sim;
    nr_camere;
    pliabil;

    // constructorul acestei clase trimite clasei parinte toate argumentele pe care
    // le cere constructorul ei
    constructor(
        nume,
        ram,
        stocare,
        tip_stocare,
        monitor,
        procesor,
        sim,
        camere,
        pliu
    ) {
        // functia super permite trimiterea argumentelor catre functia de tip constructor din clasa parinte
        super(nume, ram, stocare, tip_stocare, monitor, procesor);
        this.nr_sim = sim;
        this.nr_camere = camere;
        this.pliabil = pliu;
    }
}

// clasa Comparator, functionand ca o librarie pentru comparatii
class Comparator {
    comparare = function (primulComputer, alDoileaComputer) {
        var msg = "";

        // comparatie care permite verificarea procesoarelor pentru
        // a afla care are frecventa mai inalta
        if (
            primulComputer.procesor.frecventa >
            alDoileaComputer.procesor.frecventa
        ) {
            console.log(
                "Computer 1 are CPU mai bun: " +
                    primulComputer.procesor.frecventa +
                    " GHz " +
                    primulComputer.procesor.frecventa * 1000 +
                    "MHz"
            );
        } else if (
            primulComputer.procesor.frecventa <
            alDoileaComputer.procesor.frecventa
        ) {
            console.log(
                "Computer 2 are CPU mai bun: " +
                    alDoileaComputer.procesor.frecventa +
                    " Ghz " +
                    alDoileaComputer.procesor.frecventa * 1000 +
                    " MHz"
            );
        } else {
            msg = "CPU-urile sunt identice";
        }

        // verificare care ne arata care are capacitatea RAM mai mare
        if (primulComputer.ram > alDoileaComputer.ram) {
            msg = "Computer 1";
        } else if (primulComputer.ram < alDoileaComputer.ram) {
            msg = "Computer 2";
        } else {
            msg = "Niciunul nu";
        }
        console.log(msg + " are RAM mai mult.");
    };
}

// creearea a doua variabile de tip Computer, fara setarea unui procesor
var laptopul_meu = new ProdusElectronic("al meu", 16, 512, "ssd", 13.6);
var pc_meu = new ProdusElectronic("pc-ul meu", 16, 1000, "ssd", 32);

// creearea a doua procesoare de tip Procesor pentru obiectele de tipul Computer
const procesor_1 = new Procesor(5, 6, 1000);
const procesor_2 = new Procesor(5.5, 8, 2000);

/* setarea acestor doua variabile de tip procesor pe obiectele
de tip Computer
*/
laptopul_meu.setProcesor(procesor_1);
pc_meu.setProcesor(procesor_2);

// afisarea celor doua obiecte de tip produs electronic
console.log(laptopul_meu);
console.log(pc_meu);

// creearea unui obiect de tip Comparator care ne va permite
// compararea acestor doua calculatoare
const comparator = new Comparator();
comparator.comparare(laptopul_meu, pc_meu);

// aici putem verifica daca procesorul de pe obiectul laptopul_meu are frecventa necesara de procesor
laptopul_meu.procesor.verificareFrecventa(3);

// creearea a doua variabil de tip Telefon
var iphone = new Telefon("15 Pro", 8, 256, "ssd", 7, 3.0, 2, 4, false);
var pixelFold = new Telefon("Pixel Fold", 8, 256, "ssd", 7, 3.0, 2, 4, true);

// afisarea variabilelor de tip telefon
console.log(iphone);
console.log(pixelFold);

// preluarea cheilor de pe obiectul de tip Telefon
var chei = Object.keys(iphone);

// afisarea cheilor salvate mai sus
console.log(chei);

// afisarea capacitatii RAM in 3 metode diferite cu rezultate identice
console.log("ram preluat cu punct", iphone.ram);
console.log("ram hardcodat ca si cheie", iphone["ram"]);
console.log("ram preluat prin folosiarea sirului de chei", iphone[chei[1]]);

// prin preluarea fiecarei chei pe rand putem sa afisam toate proprietatile obiectului
chei.forEach((cheie) => {
    console.log(cheie, iphone[cheie]);
});

const telefoane = [iphone, pixelFold];

const tabel = document.getElementById("tabel-telefoane");

const adaugareElementTabel = (telefon) => {
    var rand_nou = tabel.insertRow();

    var celula1 = rand_nou.insertCell(0);
    var celula2 = rand_nou.insertCell(1);

    celula1.innerHTML = telefon.nume;
    celula2.innerHTML = telefon.stocare;
}

const afisare = () => {
    adaugareElementTabel({ nume: "Nume Telefon", stocare: "Stocare" });
    telefoane.forEach((telefon) => adaugareElementTabel(telefon));
}

afisare();

document
    .getElementById("butonAdaugare")
    .addEventListener("click", (eveniment) => {
        eveniment.preventDefault();

        var flag = true;

        var nume = document.getElementById("nume").value;
        var stocare = document.getElementById("stocare").value;

        const noulTelefon = { nume, stocare };

        telefoane.forEach((telefon) => {
            if (telefon.nume === nume) {
                alert("Telefonul deja exista");
                flag = false;
                return;
            }
        });

        if (flag === true) {
            telefoane.push(noulTelefon);
            adaugareElementTabel(noulTelefon);
        }
    });

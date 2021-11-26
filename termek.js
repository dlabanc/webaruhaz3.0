class Termek {
    constructor(node, adat) {
        this.node = node;
        /**selectorok elnvezése */
        this.adat = adat;
        this.termekNev = this.node.children(".termeknev");
        this.termekLeiras = this.node.children(".leiras");
        this.termekAr = this.node.children(".ar");

    }

    setAdat(adat) {
        this.adat = adat;
        this.termekNev.text(adat.nev);
        this.termekLeiras.text(adat.leiras);
        this.termekAr.text(adat.ar + " Ft");
        this.termekKep.attr("src", adat.kep);
    }
    kattintasTrigger(esemenyneve) {

        let esemeny = new CustomEvent(esemenyneve, {

            detail: this.adat, //ezzel adatokat tudok átadni
        });
        window.dispatchEvent(esemeny); // A főablakhoz adom az eseményt,
        //Az eseményt majd a script.js-ben el tudom kapni.
    }


    //saját esemény létrehozása
}

class TermekAdmin extends Termek {
    constructor(node, adat) {
        super(node, adat)
        this.termekKep = this.node.children(".kep ").children("img");
        this.termekTorles = this.node.children(".torles").children("button");
        this.termekModosit = this.node.children(".modosit").children("button");
        this.setAdat(this.adat);
        this.termekTorles.on("click ", () => {
            this.kattintasTrigger("torles");

        });
        this.termekModosit.on("click ", () => {
            this.kattintasTrigger("modositas");

        });
    }


}

class TermekAruhaz extends Termek {
    constructor(node, adat) {
        super(node, adat)
        this.termekKep = this.node.children(".kep ");

        this.setAdat(this.adat);
        this.termekKosar = this.node.children(".kosarba");

        this.termekKosar.on("click ", () => {
            this.kattintasTrigger("termekKosarba");

        });
    }



}
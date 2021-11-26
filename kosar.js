class Kosar {
  constructor() {
    //mutatók a grafikus elemekhez
    this.kosarElem = $('#kosaram')
    this.osszarElem = $('#osszar')
    this.kosarTomb = []
    //localstorage-ból beolvassuk az adatokat és betesszük a tömbbe
    // console.log(localStorage.getItem('kosaram'))
    if (localStorage.getItem('kosaram') !== null) {
      this.kosarTomb = JSON.parse(localStorage.getItem('kosaram'))
      this.megjelenit()
    }
  }
  setKosar(termek) {
    this.kosarTomb.push(termek)
    localStorage.setItem('kosaram', JSON.stringify(this.kosarTomb))

    this.megjelenit()
  }

  megjelenit() {
    //itt jelenítjük meg a kosár tartalmát
    let txt = '<table>'
    this.kosarTomb.forEach((elem, index) => {
      txt +=
        '<tr><td>' +
        elem.nev +
        '</td><td>' +
        elem.ar +
        '</td> <td><button data-id="' +
        index +
        '" class="torol">X</button></td></tr>'
    })

    txt += '</table>'

    this.kosarElem.html(txt)
    this.kosarbaGombElem = $('.torol')
    this.kosarbaGombElem.on('click', (event) => {
      let id = $(event.target).attr('data-id')
      this.kosarTomb.splice(id, 1)
      localStorage.setItem('kosaram', JSON.stringify(this.kosarTomb))
      this.megjelenit()
    })
  }
}

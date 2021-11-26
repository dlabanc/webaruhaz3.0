$(function () {
  let apiVegpont = "http://localhost:3000/termekek";

  const ajaxHivas = new AjaxHivas();

  ajaxHivas.getAjax(apiVegpont, termekLista);

  function termekLista(termekek) {
    const szuloElem = $(".termekek");
    const sablonElem = $("thead .termek");

    szuloElem.empty();
    sablonElem.show();

    termekek.forEach(function (elem) {
      let node = sablonElem.clone().appendTo(szuloElem);
      const obj = new TermekAdmin(node, elem, elem.id);
      console.log(obj);
    });
    sablonElem.hide(); //sablonelem eltávolítása
  }
  $(window).on("torles", (event) => {
    ajaxHivas.deleteAjax(apiVegpont, event.detail.id);
    ajaxHivas.getAjax(apiVegpont, termekLista);
    
  });

  $(window).on("modositas", (event) => {
    console.log($("modositas"));
    
  });
});

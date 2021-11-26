$(function () {
  const kosar = new Kosar();

  var ujUrl;
  var ar = $("#ar").val();
  var ertek = $("#rendezes").val();

  const ajaxHivas = new AjaxHivas();

  let apiVegpont = "http://localhost:3000/termekek";
  ajaxHivas.getAjax(apiVegpont, termekLista);

  function termekLista(termekek) {
    const szuloElem = $(".termekek");
    const sablonElem = $("#sablon .termek");
    szuloElem.empty();
    sablonElem.show();

    termekek.forEach(function (elem) {
      let node = sablonElem.clone().appendTo(szuloElem);
      const obj = new TermekAruhaz(node, elem);
    });
    sablonElem.hide(); //sablonelem eltávolítása

    $(window).on("termekKosarba", (event) => {
      //itt hívjuk meg a kosarat és belepakoljuk a kosár tömbbe az
      //aktuális termék adatait
      kosar.setKosar(event.detail);
    });
  }

  $("#nevKeres").on("keyup", () => {
    console.log($("#nevKeres").val());
    var beirt = $("#nevKeres").val();
    var ujUrl = apiVegpont + "?nev_like=" + beirt;
    ajaxHivas.getAjax(ujUrl, termekLista);
  });

  $("#rendezes").change(function () {
    rendezesSzures()
  });

  $("#ar").on("input", function () {
    ar = $("#ar").val();
    $("#kivalasztottAr").html("Maximum ár: " + ar + " Ft");
  });

  $("#ar").on("change", function () {
    rendezesSzures()
  });

  function rendezesSzures() {
    ujUrl = apiVegpont;
    ar = $("#ar").val();
    ertek = $("#rendezes").val();
    if (ertek === "novekvo") {
      ujUrl = apiVegpont + "?_sort=nev&_order=asc&ar_gte=0&ar_lte=" + ar;
    } else if (ertek === "csokkeno") {
      ujUrl = apiVegpont + "?_sort=nev&_order=desc&ar_gte=0&ar_lte=" + ar;
    }
    ajaxHivas.getAjax(ujUrl, termekLista);
  }
});

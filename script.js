$(function () {
  const kosar = new Kosar();

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
    var ar = $("#ar").val();
    console.log(ar)
    var ujUrl = apiVegpont;
    var ertek = $("#rendezes").val();
    if (ertek === "novekvo") {
      ujUrl = apiVegpont + "?_sort=nev&_order=asc?ar_gte=0&ar_lte="+ar;
    } else if (ertek === "csokkeno") {
      ujUrl = apiVegpont + "?_sort=nev&_order=desc?ar_gte=0&ar_lte="+ar;
    }

    ajaxHivas.getAjax(ujUrl, termekLista);
  });

  

  $("#ar").on("input", function () {
    var ertek = $("#rendezes").val();
    var ar = $("#ar").val();
    $("#kivalasztottAr").html("Maximum ár: " + ar + " Ft");
  });
  

  $("#ar").on("change", function () {
    var ertek = $("#rendezes").val();
    var ar = $("#ar").val();
    if (ertek === "novekvo") {
      ujUrl = apiVegpont + "?_sort=nev&_order=asc?ar_gte=0&ar_lte="+ar;
    } else if (ertek === "csokkeno") {

      ujUrl = apiVegpont + "?ar_gte=0&ar_lte="+ar+"?_sort=nev&_order=desc"
    }
    ajaxHivas.getAjax(ujUrl, termekLista);
  });
});

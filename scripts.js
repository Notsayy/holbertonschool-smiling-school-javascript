$(document).ready(function () {
  loadQuotes();
});

function loadQuotes() {
  $(".loader").show();
  $("#quotes-carousel").hide();

  $.ajax({
    url: "https://smileschool-api.hbtn.info/quotes",
    method: "GET",
    dataType: "json",
    success: function (data) {
      let carouselItems = "";
      data.forEach(function (quote, index) {
        const activeClass = index === 0 ? "active" : "";
        carouselItems += `
              <div class="carousel-item ${activeClass}">
                <div class="row mx-auto align-items-center justify-content-center">
                  <div class="col-12 col-sm-2 col-lg-2 text-center">
                    <img
                      src="${quote.pic_url}"
                      class="d-block align-self-center"
                      alt="${quote.name}"
                    />
                  </div>
                  <div class="col-12 col-sm-7 col-lg-7">
                    <div class="quote-text">
                      <p class="text-white">
                        « ${quote.text}
                      </p>
                      <h4 class="text-white font-weight-bold">${quote.name}</h4>
                      <span class="text-white">${quote.title}</span>
                    </div>
                  </div>
                </div>
              </div>
        `;
      });

      $("#quotes-carousel .carousel-inner").html(carouselItems);
      $(".loader").hide();
      $("#quotes-carousel").show();
      $("#quotes-carousel").carousel();
    },
    error: function (error) {
      console.error("Erreur lors du chargement des quotes:", error);
      $(".loader").hide();
    },
  });
}

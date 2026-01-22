$(document).ready(function () {
  loadQuotes();
  loadPopularTutorials();
  loadLatestVideos();
});

function loadQuotes() {
  $(".loader").show();
  $("#carouselExampleControls").hide();

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
                <img src="${quote.pic_url}" class="d-block align-self-center" alt="${quote.name}" />
              </div>
              <div class="col-12 col-sm-7 col-lg-7">
                <div class="quote-text">
                  <p class="text-white">« ${quote.text}</p>
                  <h4 class="text-white font-weight-bold">${quote.name}</h4>
                  <span class="text-white">${quote.title}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      $("#carouselExampleControls .carousel-inner").html(carouselItems);
      $(".loader").hide();
      $("#carouselExampleControls").show();
    },
    error: function (error) {
      console.error("Erreur quotes:", error);
      $(".loader").hide();
    },
  });
}

function createSlidingCarousel(carouselId, videos) {
  const $carousel = $(carouselId);
  const $inner = $carousel.find(".carousel-inner");
  let currentIndex = 0;
  const videosLoop = [...videos, ...videos, ...videos];
  const startIndex = videos.length;
  let allCardsHTML =
    '<div class="carousel-item active"><div class="row flex-nowrap" style="transition: transform 0.6s ease;">';

  videosLoop.forEach(function (video) {
    let starsHtml = "";
    for (let k = 1; k <= 5; k++) {
      const starImage = k <= video.star ? "star_on.png" : "star_off.png";
      starsHtml += `<img src="images/${starImage}" alt="star" width="15px" />`;
    }

    allCardsHTML += `
      <div class="col-12 col-sm-6 col-lg-3" style="flex: 0 0 auto;">
        <div class="card mx-2">
          <img src="${video.thumb_url}" class="card-img-top" alt="${video.title}" />
          <div class="card-img-overlay text-center">
            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
          </div>
          <div class="card-body">
            <h5 class="card-title font-weight-bold">${video.title}</h5>
            <p class="card-text text-muted">${video["sub-title"]}</p>
            <div class="creator d-flex align-items-center">
              <img src="${video.author_pic_url}" alt="${video.author}" width="30px" class="rounded-circle" />
              <h6 class="pl-3 m-0 main-color">${video.author}</h6>
            </div>
            <div class="info pt-3 d-flex justify-content-between">
              <div class="rating">${starsHtml}</div>
              <span class="main-color">${video.duration}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  allCardsHTML += "</div></div>";
  $inner.html(allCardsHTML);

  const $row = $inner.find(".row");
  currentIndex = startIndex;
  $carousel.carousel("dispose");
  function updateCarouselPosition(animate = true) {
    const cardWidth = $row.find(".col-12").first().outerWidth(true);
    const translateX = -(currentIndex * cardWidth);

    if (animate) {
      $row.css("transition", "transform 0.6s ease");
    } else {
      $row.css("transition", "none");
    }

    $row.css("transform", `translateX(${translateX}px)`);
  }
  setTimeout(function () {
    updateCarouselPosition(false);
  }, 100);
  $carousel
    .find(".carousel-control-next")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();
      currentIndex++;
      updateCarouselPosition(true);
      if (currentIndex >= videos.length * 2) {
        setTimeout(function () {
          currentIndex = videos.length;
          updateCarouselPosition(false);
        }, 600);
      }
    });
  $carousel
    .find(".carousel-control-prev")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();
      currentIndex--;
      updateCarouselPosition(true);
      if (currentIndex < videos.length) {
        setTimeout(function () {
          currentIndex = videos.length * 2 - 1;
          updateCarouselPosition(false);
        }, 600);
      }
    });
}

function loadPopularTutorials() {
  $("#popular-loader").show();
  $("#carouselExampleControls2").hide();

  $.ajax({
    url: "https://smileschool-api.hbtn.info/popular-tutorials",
    method: "GET",
    dataType: "json",
    success: function (data) {
      createSlidingCarousel("#carouselExampleControls2", data);
      $("#popular-loader").hide();
      $("#carouselExampleControls2").show();
    },
    error: function (error) {
      console.error("Erreur popular tutorials:", error);
      $("#popular-loader").hide();
    },
  });
}
function loadLatestVideos() {
  $("#latest-loader").show();
  $("#carouselExampleControls3").hide();

  $.ajax({
    url: "https://smileschool-api.hbtn.info/latest-videos",
    method: "GET",
    dataType: "json",
    success: function (data) {
      createSlidingCarousel("#carouselExampleControls3", data);
      $("#latest-loader").hide();
      $("#carouselExampleControls3").show();
    },
    error: function (error) {
      console.error("Erreur latest videos:", error);
      $("#latest-loader").hide();
    },
  });
}

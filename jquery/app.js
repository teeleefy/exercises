document.addEventListener("DOMContentLoaded", function () {
  console.log("Let's get ready to party with jQuery!");
  $("article img").addClass("image-center");
  $("article p:last-of-type").remove();
  function randomPixel() {
    let num = Math.floor(Math.random() * 100);
    return `${num}px`;
  }
  $("h1").css("font-size", randomPixel);
  $("ol").append($("<li>", { text: "Oh, actually, it's a squirrel!" }));
  //   $("aside h4, aside ol").remove()
  $("aside")
    .empty()
    .append(
      $("<p>", {
        text: "On second thought, what a silly idea.  A list about lists. Absolutely, ridiculous. Please enjoy this very fine paragraph instead.",
      })
    );
  function changeColor() {
    let red = $(".form-control").eq(0).val();
    let green = $(".form-control").eq(1).val();
    let blue = $(".form-control").eq(2).val();
    $("body").css("background-color", `rgb(${red}, ${green}, ${blue})`);
  }
  $(".form-control").on("keyup blur change", changeColor);
  function removeImg(){
    $('img').remove()
  }
  $('img').on('click', removeImg)
});

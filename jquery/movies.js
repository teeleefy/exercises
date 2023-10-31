let currentId = 0;
// let moviesList = [];

function createLi(evt) {
  evt.preventDefault();
  let title = $("#title").val();
  let rating = $("#rating").val();
  //   let movieData = { title, rating, currentId };
  $("ul").append(
    $("<li>", {
      text: `The movie ${title} has a rating of ${rating}. `,
    })
  );
  //   moviesList.push(movieData);
  createButton(currentId);
  $("form").trigger("reset");
  currentId++;
}

function createButton(index) {
  $("li")
    .eq(index)
    .append($("<button>", { text: "Remove" }));
  $("button").on("click", removeRating);
}

function removeRating(evt) {
  let removeThis = evt.target;
  removeThis.closest("li").remove();

}

$("#submit").on("click", createLi);

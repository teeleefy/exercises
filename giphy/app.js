console.log("Let's get this party started!");
const $searchInput = $("#searchField");

async function searchAPI(evt) {
  evt.preventDefault();

  let searchThis = $searchInput.val();
  $searchInput.val("");
  console.log(searchThis);
  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: { api_key: "iy1oDOpwAR1QwbxIY6P91Gn0axKySe6Y", q: searchThis },
  });

  //   console.log("got", response.data);
  //   console.log(`This is the length: ${response.data.data.length}`);
  const results = response.data;
  //   console.log(`This is your results: ${results}.`);

  appendGif(results);
}

$("form").on("submit", searchAPI);

function appendGif(array) {
  let gif = chooseOneUrlFrom(array);
  //   console.log(`This is inside appendGif. Your gif is ${gif}.`);
  let $gifDiv = $("#addGifsHere");
  const newGif = $(`<img src="${gif}"></img>`).appendTo($gifDiv);
  newGif.css({ width: "300px" });
}

function chooseOneUrlFrom(arr) {
  const arrayLength = arr.data.length;
  //   console.log(`This is your arrayLength: ${arrayLength}.`);
  const index = Math.floor(Math.random() * arrayLength);
  //   console.log(`This is your random index: ${index}.`);
  const url = arr.data[index].images.original.url;
  //   console.log(`Your url is ${url}.`);
  return url;
}

function removeGifs() {
  let $gifDiv = $("#addGifsHere");
  $gifDiv.empty();
}

const $removeButton = $("button");
$removeButton.on("click", removeGifs);

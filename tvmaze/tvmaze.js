"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const $episodesList = $("#episodesList");

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(searchInput) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const response = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${searchInput}`
  );
  console.log("got", response.data);
  const results = response.data;
  const showArray = [];
  for (let i = 0; i < response.data.length; i++) {
    const showData = {
      id: results[i].show.id,
      name: results[i].show.name,
      summary: results[i].show.summary,
      image: results[i].show.image.original,
    };
    showArray.push(showData);
  }
  return showArray;
}

/** Given list of shows, create markup for each and to DOM */
function createImg(show) {
  if (show.image) {
    return show.image;
  } else {
    return placeholderImg;
  }
}
const placeholderImg =
  "https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300";

function populateShows(shows) {
  $showsList.empty();
  for (let show of shows) {
    console.log(show);
    let showImg = createImg(show);
    console.log("inside of populateShows for-loop: " + showImg);
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
       <div class="media">
         <img
            src=${showImg}
            class="w-25 me-3">
         <div class="media-body">
           <h5 class="text-primary">${show.name}</h5>
           <div><small>${show.summary}</small></div>
           <button class="btn btn-outline-light btn-sm Show-getEpisodes">
             Episodes
           </button>
         </div>
       </div>
     </div>`
    );
    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  $("#searchForm-term").val("");
  const shows = await getShowsByTerm(term);
  console.log(
    `this is inside searchForShowAndDisplay. Your shows variable returns this: ${shows}.`
  );

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const response = await axios.get(
    `http://api.tvmaze.com/shows/${id}/episodes`
  );
  console.log("got", response.data);
  const results = response.data;
  const episodesArray = [];
  for (let i = 0; i < response.data.length; i++) {
    const episodeData = {
      name: results[i].name,
      season: results[i].season,
      number: results[i].number,
    };
    episodesArray.push(episodeData);
  }

  // console.log(episodesArray);
  return episodesArray;
}

async function showEpisodeList(evt) {
  // evt.target.preventDefault();
  const $clickedButton = $(evt.target);
  const showId = $clickedButton.closest("[data-show-id]").data("show-id");
  // console.log(`The show ID is : ${showId}.`);
  const episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
  $episodesArea.toggle();
}

/** Write a clear docstring for this function... */
$showsList.on("click", showEpisodeList);

function populateEpisodes(episodes) {
  $episodesList.empty();
  for (let episode of episodes) {
    console.log(episode.name);
    const $episode = $(
      `<li>
      ${episode.name} 
      (season ${episode.season}, episode ${episode.number})</li>`
    );
    $("#episodesList").append($episode);
  }
}

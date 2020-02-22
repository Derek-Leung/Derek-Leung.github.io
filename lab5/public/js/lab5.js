const addArtist = () => {
  let artistNameInput = document.getElementById("artistName");
  let artistName = artistNameInput.value;
  let aboutArtistInput = document.getElementById("aboutArtist");
  let aboutArtist = aboutArtistInput.value;
  let imageURLInput = document.getElementById("imageURL");
  let imageURL = imageURLInput.value;
  let artistID = Date.now();

  fetch(
    `/artists/add?name=${artistName}&about=${aboutArtist}&url=${imageURL}&id=${artistID}`
  ).then(response => {
    if (response.status !== 200) {
      console.log("Error adding artist: ", response.status);
      return;
    }
    response.json().then(data => {
      createArtistListItem(data.name, data.about, data.id, data.url);
    });
  });
  showAddArtist(false);
  artistNameInput.value = "";
  aboutArtistInput.value = "";
  imageURLInput.value = "";
};

const showAddArtist = () => {
  let addForm = document.getElementById("addArtist");
  let display = window.getComputedStyle(addForm).display;

  let artistNameInput = document.getElementById("artistName");
  let aboutArtistInput = document.getElementById("aboutArtist");
  let imageURLInput = document.getElementById("imageURL");

  artistNameInput.value = "";
  aboutArtistInput.value = "";
  imageURLInput.value = "";

  if (display == "none") addForm.style.display = "block";
  else addForm.style.display = "none";
};

const createArtistListItem = (artistName, aboutArtist, artistID, imageURL) => {
  let img = createArtistImage(imageURL);
  let descriptionDiv = createArtistDescriptionDiv(artistName, aboutArtist);
  let li = document.createElement("li");
  let deleteBtn = createDeleteBtn(artistID);

  li.appendChild(img);
  li.appendChild(descriptionDiv);
  li.appendChild(deleteBtn);

  li.id = artistID;

  document.getElementById("list").appendChild(li);
};

const createArtistImage = imageURL => {
  let img = document.createElement("img");

  img.src = imageURL;
  img.className = "artistImage";
  img.alt = "Artist Image";
  return img;
};

const createArtistDescriptionDiv = (artistName, aboutArtist) => {
  let descriptionDiv = document.createElement("div");
  let artistNameHeader = document.createElement("h3");
  let artistDescription = document.createElement("p");

  artistNameHeader.textContent = artistName;
  artistDescription.textContent = aboutArtist;

  descriptionDiv.className = "artistDescription";
  descriptionDiv.appendChild(artistNameHeader);
  descriptionDiv.appendChild(artistDescription);

  return descriptionDiv;
};

const createDeleteBtn = artistID => {
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "artistDeleteBtn";
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = () => {
    let element = document.getElementById(artistID);
    element.parentNode.removeChild(element);
    fetch(`/artists/delete?id=${artistID}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Error deleting artist: ", response.status);
        }
      })
      .catch(err => {
        console.log("Cannot connect to server:", err);
      });
  };

  return deleteBtn;
};

const searchArtist = () => {
  let searchString = document
    .querySelector("#artistSearchBox")
    .value.toLowerCase();

  let listItems = document.querySelectorAll("#list li");
  listItems.forEach(item => item.remove());
  fetch(`/artists/search?searchParam=${searchString}`).then(response => {
    if (response.status !== 200) {
      console.log("Error searching: ", response.status);
      return;
    }
    response.json().then(data => {
      if (data.length > 0) {
        data.forEach(artist =>
          createArtistListItem(artist.name, artist.about, artist.id, artist.url)
        );
      }
    });
  });
};

(function loadArtistList() {
  fetch(`/artists`).then(response => {
    if (response.status !== 200) {
      console.log("Error adding artist: ", response.status);
      return;
    }
    response.json().then(data => {
      if (data.length > 0) {
        data.forEach(artist => {
          createArtistListItem(
            artist.name,
            artist.about,
            artist.id,
            artist.url
          );
        });
      }
    });
  });
})();

const addArtist = () => {
  let artistInfo = {
    name: "",
    description: "",
    imageURL: ""
  };
  let artistNameInput = document.getElementById("artistName");
  let artistName = artistNameInput.value;
  let aboutArtistInput = document.getElementById("aboutArtist");
  let aboutArtist = aboutArtistInput.value;
  let imageURLInput = document.getElementById("imageURL");
  let imageURL = imageURLInput.value;
  let artistID = Date.now();

  artistNameInput.value = "";
  aboutArtistInput.value = "";
  imageURLInput.value = "";

  artistInfo.name = artistName;
  artistInfo.description = aboutArtist;
  artistInfo.imageURL = imageURL;

  window.localStorage.setItem(artistID, JSON.stringify(artistInfo));
  createArtistListItem(artistName, aboutArtist, artistID, imageURL);
  showAddArtist(false);
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
    window.localStorage.removeItem(artistID);
  };

  return deleteBtn;
};

const searchArtist = value => {
  let searchString = value.toLowerCase();
  if (window.localStorage.length > 0) {
    let storage = window.localStorage;
    for (let i = 0; i < storage.length; i++) {
      let id = storage.key(i);
      let artist = JSON.parse(storage.getItem(id));
      if (artist.name.indexOf(searchString) == -1) {
        document.getElementById(id).style.display = "none";
      } else {
        document.getElementById(id).style.display = "block";
      }
    }
  }
};

(function loadArtistList() {
  if (window.localStorage.length > 0) {
    let storage = window.localStorage;
    for (let i = 0; i < storage.length; i++) {
      let id = storage.key(i);
      let artist = JSON.parse(storage.getItem(id));
      createArtistListItem(
        artist.name,
        artist.description,
        id,
        artist.imageURL
      );
    }
  }
})();

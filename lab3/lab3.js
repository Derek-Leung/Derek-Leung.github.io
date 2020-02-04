let addArtist = () => {
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

  let img = createArtistImage(imageURL);
  let descriptionDiv = createArtistDescriptionDiv(artistName, aboutArtist);
  let li = document.createElement("li");
  let deleteBtn = createDeleteBtn(artistID);

  li.appendChild(img);
  li.appendChild(descriptionDiv);
  li.appendChild(deleteBtn);

  li.id = artistID;

  document.getElementById("list").appendChild(li);
  showAddArtist(false);
};

let showAddArtist = () => {
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

let createArtistImage = imageURL => {
  let img = document.createElement("img");

  img.src = imageURL;
  img.className = "artistImage";
  img.alt = "Artist Image";
  return img;
};

let createArtistDescriptionDiv = (artistName, aboutArtist) => {
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

let createDeleteBtn = artistID => {
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "artistDeleteBtn";
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = () => {
    let element = document.getElementById(artistID);
    element.parentNode.removeChild(element);
  };

  return deleteBtn;
};

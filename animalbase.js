"use strict";
//when "all" is clicked, return all results with a function - return: true

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons

  getButtonChoice();
  loadJSON();
}

function getButtonChoice() {
  document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", selectFilter));
  document.querySelectorAll('[data-action="sort"]').forEach((button) => button.addEventListener("click", selectSort));
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function selectFilter(event) {
  const filter = event.target.dataset.filter;
  filterList(filter);
}

function selectSort(event) {
  const sort = event.target.dataset.sort;
  sortList(sort);
  console.log(sort);
}

function filterList(animalType) {
  let filteredList = allAnimals;

  if (animalType === "cat") {
    //create filtered list of only cats
    filteredList = allAnimals.filter(onlyCats);
  } else if (animalType === "dog") {
    //create filtered list of only dogs
    filteredList = allAnimals.filter(onlyDogs);
  }

  displayList(filteredList);
}

function onlyCats(animal) {
  if (animal.type === "cat") {
    return true;
  } else {
    return false;
  }
  // return animal.type === "cat" - gives same result
}

function onlyDogs(animal) {
  if (animal.type === "dog") {
    return true;
  } else {
    return false;
  }
  // return animal.type === "cat" - gives same result
}

function all(animal) {
  if (animal.type === "") {
    return true;
  }
}

function sortList(sortChoice) {
  let sortedList = allAnimals;

  if (sortChoice === "name") {
    sortedList = sortedList.sort(sortName);
  } else if (sortChoice === "type") {
    sortedList = sortedList.sort(sortType);
  } else if (sortChoice === "desc") {
    sortedList = sortedList.sort(sortDescription);
  } else if (sortChoice === "age") {
    sortedList = sortedList.sort(sortAge);
  }

  displayList(sortedList);
}

function sortName(a, b) {
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }
}

function sortType(a, b) {
  if (a.type < b.type) {
    return -1;
  } else {
    return 1;
  }
}

function sortDescription(a, b) {
  if (a.desc < b.desc) {
    return -1;
  } else {
    return 1;
  }
}

function sortAge(a, b) {
  if (a.age < b.age) {
    return -1;
  } else {
    return 1;
  }
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

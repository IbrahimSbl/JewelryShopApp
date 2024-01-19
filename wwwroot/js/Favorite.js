//I will use local storage to store the data
//the name of the string that contains the favorite products is
//      favorite-JSGE472HDTA82H

function getFavorite() {
    var FAVORITE = localStorage.getItem("favorite-JSGE472HDTA82H");
    if (FAVORITE === null) {
        localStorage.setItem("favorite-JSGE472HDTA82H", "");
        return [];
    }
    return FAVORITE.split(" ");
}
function setFavorite(favorite) {
    
    localStorage.setItem("favorite-JSGE472HDTA82H", favorite.join(" "));
}
function deleteFavorite() {
    localStorage.setItem("favorite-JSGE472HDTA82H", null);
    favorite = [];
}
var favorite = getFavorite(); 
function checkAvailability(key) {
    let check = favorite.includes(key);
    let tag = document.getElementById(key);
    if (tag) {
        if (check == true) {
            //the key is found in the array
            //so remove the active-like class from the <a> tag
            //then remove the key from the array
            favorite = favorite.filter(item => item !== key);
            setFavorite(favorite);

            tag.classList.remove('active-like');
        } else {
            //the key is not found in the array
            //so add the active-like class to the <a> tag
            //then insert the key to the array
            favorite.push(key);
            setFavorite(favorite);

            tag.classList.add('active-like');
        }
    }
}
function showFavorites() {
    let like_buttons = document.getElementsByClassName("like");
    for (let i = 0; i < like_buttons.length; i++) {
        let key = like_buttons[i].id;
        if (favorite.includes(key) == true) {
            document.getElementById(key).classList.add('active-like');
        } else {
            document.getElementById(key).classList.remove('active-like');
        }
    }
}
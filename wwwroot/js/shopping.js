function showSnackbar(body, color) {
	var container = document.getElementById("snackbar-show-container");
	container.innerHTML = "<div class=\"toast show hide align-items-center text-white bg-" + color + " border-0\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\" data-bs-delay=\"0\"><div class=\"d-flex\"><div class=\"toast-body\">" + body + "</div><button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button></div></div>";
	setTimeout(() => {
		document.getElementsByClassName('toast')[0].classList.remove('show');
	}, 2000);
}
function setInitial(cat) {
	setTimeout(function () {
		if (cat == 'All') {
			document.getElementById("Category").value = "Category";
		} else {
			document.getElementById("Category").value = cat;
		}
	}, 2000);	
}
function reset() {
	document.getElementById("Category").value = 'Category';
	document.getElementById("Price").value = 'Price';
}
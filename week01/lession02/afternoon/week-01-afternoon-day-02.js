// task 1: Change Text Content of a Div

document.getElementById("changeTextBtn").addEventListener("click", () => {
  document.getElementById("textDisplay").textContent = "Hello, JavaScript!";
});

// task 2: Toggle a CSS Class on an Element
document.getElementById("toggleHighlightBtn").addEventListener("click", () => {
  const box = document.querySelector(".box");
  box.classList.toggle("highlight");
});

// task 3: Add New List Item
document.getElementById("addItemBtn").addEventListener("click", () => {
  const itemText = document.getElementById("itemInput").value;
  if (itemText.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = itemText;
    document.getElementById("itemList").appendChild(li);
    document.getElementById("itemInput").value = ""; // clear input
  }
});

//task 4: Remove an Element

document.getElementById("removeItemBtn").addEventListener("click", () => {
  const itemList = document.getElementById("itemRemoveList");
  if (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
});

// task 5: Change image
document.getElementById("changeImageBtn").addEventListener("click", () => {
  document.getElementById("mainImage").src =
    "https://binhminhdigital.com/StoreData/PageData/3429/Tim-hieu-ve-ban-quyen-hinh-anh%20(3).jpg";
});

// task 6: get input value and display it
document
  .getElementById("submitUsername")
  .addEventListener("click", function () {
    const username = document.getElementById("usernameInput").value;
    alert("Entered Username: " + username);
  });

// task 7: Event Listener on Multiple Elements

const buttons = document.querySelectorAll(".colorBtn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    alert(button.textContent);
  });
});

// task 9: live clock
function startTime() {
  const today = new Date();
  let HH = today.getHours();
  let MM = today.getMinutes();
  let SS = today.getSeconds();
  MM = checkTime(MM);
  SS = checkTime(SS);
  document.getElementById("clockDisplay").innerHTML = HH + ":" + MM + ":" + SS;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Task 10: Validate Form Field
document.getElementById("validateBtn")?.addEventListener("click", () => {
  const email = document.getElementById("emailInput").value;
  const error = document.getElementById("errorMessage");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    error.textContent = "Invalid email address.";
  } else {
    error.textContent = "";
  }
});

// Task 11: Hide Element
document.getElementById("hideParaBtn")?.addEventListener("click", () => {
  document.getElementById("infoPara").style.display = "none";
});

//Task 12: Greeting Based on Time
window.addEventListener("DOMContentLoaded", () => {
  const greeting = document.getElementById("greetingText");
  if (!greeting) return;
  const hour = new Date().getHours();
  let message = "Hello";
  if (hour < 12) {
    message = "Good Morning";
  } else if (hour < 18) {
    message = "Good Afternoon";
  } else {
    message = "Good Evening";
  }
  greeting.textContent = message;
});

//Task 13: Field Border Highlight on Error
document.getElementById("formSubmit")?.addEventListener("click", (e) => {
  const nameInput = document.getElementById("nameInput");
  const error = document.getElementById("nameError");
  if (!nameInput.value.trim()) {
    nameInput.classList.add("error");
    error.textContent = "Name is required.";
  } else {
    nameInput.classList.remove("error");
    error.textContent = "";
  }
});

// Task 14: Disable Button After Click
document.getElementById("onceBtn")?.addEventListener("click", (e) => {
  e.target.disabled = true;
});

//Task 15: Textarea Character Counter
document.getElementById("bioInput")?.addEventListener("input", (e) => {
  const remaining = 200 - e.target.value.length;
  console.log(remaining);

  document.getElementById(
    "charCount"
  ).textContent = `${remaining} characters left`;
});

const socket = io({
  autoConnect: false,
});

const chatSocket = () => {
  if (chatBox.value.trim().length > 0) {
    socket.emit("message", { userName: userName, message: chatBox.value });
    chatBox.value = "";
  }
};

const header = document.getElementById("header");
Swal.fire({
  title: "Welcome!",
  input: "text",
  text: "Type your username:",
  inputValidator: (value) => {
    return !value && "You must enter a username";
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then((result) => {
  userName = result.value;
  socket.connect();
  header.innerHTML = `"${userName}"`;
});


const chatBox = document.getElementById("chatBox");
chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    chatSocket();
  }
});

const sendButton = document.getElementById("send");
sendButton.addEventListener("click", () => {
  chatSocket();
});

socket.on("log", (data) => {
  const chats = document.getElementById("chats");
  chats.innerText = "";
  chats.innerHTML = usersChats(data);
  chats.scrollTop = chats.scrollHeight;
});


socket.on("newUserConnected", (data) => {
  if (userName) {
    Swal.fire({
      text: "A new user joined!!",
      toast: true,
      position: "top-right",
      timer: 1000,
    });
  }
});

socket.on("productList", (data) => {
  const products = document.getElementById("products");
  products.innerText = "";
  products.innerHTML = productsList(data.products);
});

const productName = document.getElementById("name");
const price = document.getElementById("price");
const img = document.getElementById("img");
const btn = document.getElementById("submit");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const product = {};
  if (productName.value.trim().length > 0 && img.value.trim().length > 0) {
    product.name = productName.value;
    product.price = price.value;
    product.img = img.value;
    socket.emit("addProduct", product);
    productName.value = "";
    price.value = "";
    img.value = "";
  } else {
    Swal.fire({
      text: "complete the form",
      toast: true,
    });
  }
});

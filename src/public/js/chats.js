let userName;

const usersChats = (chatList) => {
  let string = "";

  for (const chat of chatList) {
    if (chat.userName === userName) {
      string += `
      <div>
        <span class="chat">
        <span class="date">${chat.date} - </span>
        <span class="userSay">${chat.userName}: </span>${chat.message}<br>
        </span>
      </div>
      `;
    } else {
      string += `
      <div>
        <span class="chat">
        <span class="date">${chat.date} - </span>
        <span class="userSay">${chat.userName}: </span>${chat.message}<br>
        </span>
      </div>
      `;
    }
  }
  return string;
};

const productsList = (products) => {
  const listProducts = products.sort((a,b) => a.price - b.price)
  let string = "";
  if (products.length == 0) {
    string = "<br><h3>No products yet</h3>";
  } else {
    for (const product of listProducts) {
      string += `
            <ul class="list-group list-group-horizontal row">
                <li class="list-group-item col-4">${product.name}</li>
                <li class="list-group-item col-4">$ ${product.price}</li>
                <li class="list-group-item col-4">
                    <img src="${product.img}" alt="${product.name} image" style="height: 80px;">
                </li>
            </ul>
            `;
    }
  }
  return string;
};

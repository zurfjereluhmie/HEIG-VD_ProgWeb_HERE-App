import { $ } from "./modules/utils.js";
import User from "./modules/User.js";

const getUsers = async () => {
    return await fetch("https://randomuser.me/api/?results=20")
        .then(response => response.json());
}

const cleanUsers = (users) => {
    return users.map(user => {
        return {
            title: user.name.title,
            first: user.name.first,
            last: user.name.last,
            city: user.location.city,
            country: user.location.country,
            age: user.dob.age,
            email: user.email,
            large: user.picture.large,
        }
    });
}

const renderApp = async () => {
    const users = cleanUsers(await getUsers().then(data => data.results));
    const sortedUsers = [...users].sort((a, b) => a.last.localeCompare(b.last));
    sortedUsers.forEach(user => (new User(user)).render());

    const sortNameBtn = $("#sort--name");
    const sortAgeBtn = $("#sort--age");

    sortNameBtn.addEventListener("click", () => {
        if (sortNameBtn.classList.contains("selected")) return;

        sortedUsers.sort((a, b) => a.last.localeCompare(b.last));

        $("main").innerHTML = "";
        sortedUsers.forEach(user => (new User(user)).render());

        sortNameBtn.classList.add("selected");
        sortAgeBtn.classList.remove("selected");
    });

    sortAgeBtn.addEventListener("click", () => {
        if (sortAgeBtn.classList.contains("selected")) return;

        sortedUsers.sort((a, b) => a.age - b.age);

        $("main").innerHTML = "";
        sortedUsers.forEach(user => (new User(user)).render());

        sortNameBtn.classList.remove("selected");
        sortAgeBtn.classList.add("selected");
    });
}

renderApp();
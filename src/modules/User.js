import { $ } from "./utils.js";

class User {

    static hereCoutner = 0;

    #title;
    #first;
    #last;
    #city;
    #country;
    #age;
    #email;
    #large;

    #isHere = false;

    #userElement;

    constructor(user) {
        this.#title = user.title;
        this.#first = user.first;
        this.#last = user.last;
        this.#city = user.city;
        this.#country = user.country;
        this.#age = user.age;
        this.#email = user.email;
        this.#large = user.large;

        this.#generateElement();
        this.#userElement.addEventListener("click", () => this.#changeStatus())
    }

    #generateElement() {
        const user = document.createElement("div");
        user.classList.add("user")
        user.dataset.present = this.#isHere;

        const img = document.createElement("img");
        img.src = this.#large;

        const info = document.createElement("div");
        info.classList.add("user--info");

        const h1 = document.createElement("h1");
        h1.textContent = `${this.#title} ${this.#first} ${this.#last}`;

        const age = document.createElement("p");
        age.textContent = `${this.#age} years old`;

        const location = document.createElement("p");
        location.textContent = `${this.#city}, ${this.#country}`;

        const mail = document.createElement("a");
        mail.href = `mailto:${this.#email}`;

        const mailIcon = document.createElement("span");
        mailIcon.classList.add("mail");
        mailIcon.textContent = "✉️";

        mail.appendChild(mailIcon);

        info.appendChild(h1);
        info.appendChild(age);
        info.appendChild(location);

        user.appendChild(img);
        user.appendChild(info);
        user.appendChild(mail);

        this.#userElement = user;
    }

    #changeStatus() {
        this.#isHere = !this.#isHere;
        this.#userElement.dataset.present = this.#isHere;

        User.hereCoutner += this.#isHere ? 1 : -1;

        User.refreshCounter();
    }

    render() {
        if (!this.#userElement) return;
        $("main").appendChild(this.#userElement);
    }

    static refreshCounter() {
        const counterText = $(".counter").textContent.split("/");
        counterText[0] = User.hereCoutner;
        $(".counter").textContent = counterText.join("/");
    }
}

export default User;
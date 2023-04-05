
class ViewController {

    constructor() {
        window.addEventListener('hashchange', this.handleHashChange)
        window.addEventListener('load', this.handleHashChange)

        this.userManager = new UserManager();
        this.animalManager = new AnimalManager();
        this.adoptedManager = new AdoptedManager();
        this.donationManager = new DonationManager();

    }

    handleHashChange = () => {
        let hash = window.location.hash.slice(1) || "mainPage";

        const pageIds = ["mainPage", "adoptedPage", "login", "register", "donatePage"];

        if (hash === 'adoptedPage' || hash === 'donatePage') {
            if (!this.userManager.loggedUser) {
                location.hash = 'login';
                return;
            }
        }

        pageIds.forEach(id => {
            let page = document.getElementById(id);

            if (hash === id) {
                page.style.display = "block";
            } else {
                page.style.display = "none";
            }
        });

        switch (hash) {
            case "mainPage":
                this.renderMainPage();
                break;
            case "adoptedPage":
                this.renderAdoptedPage();
                break;
            case "donatePage":
                this.handleDonatePage();
                break;
            case "register":
                this.renderRegistration();
                break;
            case "login":
                this.renderLogin();
                break;
        }

    }

    renderAnimals = (animalList, container) => {
        container.innerHTML = "";

        animalList.forEach(item => {

            let card = document.createElement('div');
            card.classList.add('card');


            let img = document.createElement('img');
            img.src = `./images/${item.image}`;
            img.width = 150;
            img.height = 150;


            let name = document.createElement('h3');
            name.innerText = item.name;
            name.classList.add('name');


            let animalType = document.createElement('div');
            animalType.innerText = "Type " + item.type;
            animalType.classList.add('animalType');

            let bread = document.createElement('div');
            bread.innerText = "Bread " + item.bread;
            bread.classList.add('bread');

            let age = document.createElement('div');
            age.innerText = item.age + " years";
            age.classList.add('age');

            let sex = document.createElement('div');
            sex.innerText = item.sex;
            sex.classList.add('sex');

            let neededSum = document.createElement('div');
            neededSum.innerText = `${item.currentlyRisedAmount}/${item.neededAmount}` + " lv.";
            neededSum.classList.add('neededSum');

            let buttonContainer = document.createElement('div');
            buttonContainer.style.cssText = `
                                display: flex;
                                gap:20px;`


            let adoptBtn = document.createElement('button');
            adoptBtn.innerText = "Adopt"
            adoptBtn.classList.add("btn");
            adoptBtn.id = "adoptBtn";
            adoptBtn.addEventListener("click", () => {
                if (!this.userManager.loggedUser) {
                    location.hash = 'login';
                    return;
                } else {
                    this.adoptedManager.addToAdopted(item);
                    this.animalManager.removeFromMainAddToAdoptedList(item);
                    this.renderMainPage();
                }
            });

            let donateBtn = document.createElement('button');
            donateBtn.innerText = "Donate";
            donateBtn.classList.add("btn");
            if (Number(item.currentlyRisedAmount) >= Number(item.neededAmount)) {
                donateBtn.style.display = "none";
            };

            donateBtn.addEventListener("click", () => {
                window.location.hash = "donatePage";
                let upperString = document.getElementById("howMuch");
                upperString.innerText = `How much do you want to donate for ${item.name} ?`;

            });


            buttonContainer.append(adoptBtn, donateBtn)

            card.append(
                img,
                name,
                animalType,
                bread,
                age,
                sex,
                neededSum,
                buttonContainer

            );
            container.appendChild(card);
        });
    }


    renderMainPage = () => {

        let searchInput = document.getElementById('searchInput');
        let animalContainer = document.querySelector('#mainPage .container');
        let inputSearch = [];
        let selectedType = '';
        searchInput.addEventListener('input', (event) => {
            inputSearch = this.animalManager.searchByName(event.target.value)
            this.renderAnimals(inputSearch, animalContainer);
        })


        // създаваме опции за селекта
        let searchByType = document.getElementById('searchByType');
        this.animalManager.typesList.forEach(type => {
            let option = document.createElement("option");
            option.value = type;
            option.innerText = type;
            if (!Array.from(searchByType.children).find(item => item.value === option.value)) {

                searchByType.appendChild(option);
            }
        })

        searchByType.addEventListener('change', (event) => {
            selectedType = event.target.value;
            if (inputSearch.length !== 0) {
                this.renderAnimals(this.animalManager.searchByNameAndType(inputSearch, selectedType), animalContainer);
            } else {
                this.renderAnimals(this.animalManager.searchByNameAndType(this.animalManager.animalList, selectedType), animalContainer);
            }
        })


        this.renderAnimals(this.animalManager.animalList, animalContainer);
    }

    renderAdoptedAnimals = (itemList, container) => {
        container.innerHTML = "";

        itemList.forEach(item => {

            let card = document.createElement('div');
            card.classList.add('card');


            let img = document.createElement('img');
            img.src = `./images/${item.image}`;
            img.width = 150;
            img.height = 150;


            let name = document.createElement('h3');
            name.innerText = item.name;
            name.classList.add('name');


            let animalType = document.createElement('div');
            animalType.innerText = "Type " + item.type;
            animalType.classList.add('animalType');

            let bread = document.createElement('div');
            bread.innerText = "Bread " + item.bread;
            bread.classList.add('bread');

            let age = document.createElement('div');
            age.innerText = item.age + " years";
            age.classList.add('age');

            let date = "Adopted : " + new Date().toLocaleDateString() + " ";
            let time = new Date().toLocaleTimeString();

            let leaveBtn = document.createElement('button');
            leaveBtn.innerText = "Leave"
            leaveBtn.classList.add("btn");
            leaveBtn.id = "leaveBtn";

            leaveBtn.addEventListener("click", () => {
                this.adoptedManager.removeFromAdopted(item);
                this.animalManager.removeFromAdoptedAddToMain(item);
                this.renderAdoptedPage();
            });


            card.append(
                img,
                name,
                animalType,
                bread,
                age,
                date,
                time,
                leaveBtn

            );
            container.appendChild(card);
        });
    }

    renderAdoptedPage = () => {
        let adoptedContainer = document.querySelector('#adoptedPage .container');
        adoptedContainer.innerHTML = "";
        if (this.adoptedManager.adoptedList.length) {
            this.renderAdoptedAnimals(this.adoptedManager.adoptedList, adoptedContainer);
        } else {
            adoptedContainer.append(document.createElement('p').innerText = "Empty page");
        }
    }

    renderLogin = () => {

        let form = document.getElementById('loginForm');
        let notificText = document.getElementById("notifText");
        notificText.innerText = "";


        form.addEventListener("keyup", () => {
            if (form.children[0].value !== "" && form.children[1].value !== "") {
                form.children[2].disabled = false;
            } else {
                form.children[2].disabled = true;
            }
        }
        )

        form.onsubmit = (e) => {
            e.preventDefault();
            let username = e.target.elements.username.value;
            let pass = e.target.elements.pass.value;
            let successfulLogin = this.userManager.login({ username, pass });

            if (successfulLogin) {
                e.currentTarget.reset();
                notificText.innerText = "Successfull login";
                notificText.style.cssText = "font-size : 16px; font-weigth:bold; color : #0C6109; padding-top:5px;";
                location.hash = "mainPage";

            } else {
                notificText.innerText = "Wrong username or password";
                notificText.style.cssText = "font-size : 16px; font-weigth:bold; color : #8E1010; padding-top:5px;"
            }
        }

        form.onclick = () => {
            notificText.innerText = "";
        }
    }

    renderRegistration = () => {

        let registerForm = document.getElementById("registerForm");
        let notification = document.getElementById("notification");
        const passRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
        notification.innerText = "";

        registerForm.addEventListener("keyup", () => {
            if (registerForm.children[0].value !== "" &&
                passRegex.test(registerForm.children[1].value) &&
                registerForm.children[1].value === registerForm.children[2].value) {
                registerForm.children[3].disabled = false;
            } else if (registerForm.children[0].value === "" ||
                registerForm.children[1].value !== registerForm.children[2].value ||
                !(passRegex.test(registerForm.children[1].value))
            ) {
                registerForm.children[3].disabled = true;
            }
        }
        )

        registerForm.onsubmit = (e) => {
            e.preventDefault();
            let username = e.target.elements.username.value;
            let pass = e.target.elements.pass.value;
            let successfulRegistration = this.userManager.register({ username, pass });

            if (successfulRegistration) {

                notification.innerText = "Successfull Registration";
                notification.style.cssText = "font-size : 16px; font-weigth:bold; color : #0C6109; padding-top:5px;"
                location.hash = "login";
                e.currentTarget.reset();

            } else {
                notification.innerText = "This username is already taken";
                notification.style.cssText = "font-size : 16px; font-weigth:bold; color : #8E1010; padding-top:5px;"
            }
        }

        registerForm.onclick = () => {
            notification.innerText = "";
        }


    }

    handleDonatePage = () => {
        let donationForm = document.getElementById("donationForm")
        let donationBtn = document.getElementById("donationBtn");
        let donatingUser = document.getElementById("donatingUser");
        donatingUser.value = this.userManager.loggedUser.username;
        let animalName = document.getElementById("howMuch").innerText.slice(35, -2);
        if (animalName !== "") {
            donationBtn.disabled = false;
            donationForm.removeEventListener("submit", this.donateAndCreateHistory);
            donationForm.addEventListener("submit", this.donateAndCreateHistory);

        }

    }

    donateAndCreateHistory = (event) => {
        event.preventDefault();
        let donationBtn = document.getElementById("donationBtn")
        let donationForm = document.getElementById("donationForm")
        let animalName = document.getElementById("howMuch").innerText.slice(35, -2);
        let tableBody = document.getElementById("tableBody");
        let date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
        let sum = donationForm.children[1].value;
        let animal = this.animalManager.animalList.find(animal => animal.name === animalName);
        let oldSum = animal.currentlyRisedAmount;
        animal.currentlyRisedAmount = Number(oldSum) + Number(sum);
        if (animal.currentlyRisedAmount >= animal.neededAmount) {
            sum = animal.neededAmount - oldSum;
            animal.currentlyRisedAmount = animal.neededAmount;
            alert(`${animalName} needs only ${sum} lv. Only this amount will be donated.`)
            alert(`Needed sum for ${animalName} is raised.`)

            donationBtn.disabled = true;
        }

        event.currentTarget.reset();

        this.donationManager.addDonationHistory(sum, animalName, date);
        this.donationManager.createTableItem(this.donationManager.donationHistoryList, tableBody);
        
    }

}

let viewController = new ViewController();
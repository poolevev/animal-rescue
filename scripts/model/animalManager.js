
class Animal {
    constructor(name, image, type, bread, age, sex, neededAmount, currentlyRisedAmount) {
        this.name = name;
        this.image = image;
        this.type = type;
        this.bread = bread;
        this.age = age;
        this.sex = sex;
        this.neededAmount = neededAmount;
        this.currentlyRisedAmount = currentlyRisedAmount;
    }
}

class AnimalManager {
    constructor() {
        this.animalList = DATA.map(animal => new Animal(
            animal.name,
            animal.image,
            animal.type,
            animal.bread,
            animal.age,
            animal.sex,
            animal.neededAmount,
            animal.currentlyRisedAmount,)
        );
        this.typesList = this.createTypesList();
        this.adoptedAnimals = [];

    }

    searchByName = (searchedName) => {
        let foundName = this.animalList.filter(animal => animal.name.toLowerCase().includes(searchedName));
        return foundName;
    }

    searchByType = (type) => {
        let foundType = this.animalList.filter(animal => animal.type === type);
        return foundType;
    }

    searchByNameAndType = (nameArr, type) => {
        let finalResult = nameArr.filter(animal => animal.type === type);

        return finalResult;
    }

    createTypesList = () => {
        const typesList = [];

        this.animalList.forEach(animal => {

            if (!typesList.includes(animal.type)) {
                typesList.push(animal.type);
            };
        });

        return typesList;
    };

    removeFromMainAddToAdoptedList = (adoptedAnimal) => {
        let adoptedAnimalIndex = this.animalList.findIndex(animal => animal.name === adoptedAnimal.name);
        let adopted = this.animalList.splice(adoptedAnimalIndex, 1);
        this.adoptedAnimals.push(adopted[0]);

    }

    removeFromAdoptedAddToMain = (leftAnimal) => {
        let leftAnimalIndex = this.adoptedAnimals.findIndex(animal => animal.name === leftAnimal.name);
        let left = this.adoptedAnimals.splice(leftAnimalIndex, 1);
        this.animalList.push(left[0]);
    }


}
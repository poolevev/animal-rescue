class AdoptedAnimal {
    constructor(image,name, type, bread,age,date) {
        this.image = image;
        this.name = name;
        this.type = type;
        this.bread = bread;        
        this.age = age;  
        this.date = date;  
    }
}

class AdoptedManager {
    adoptedList = [];

    addToAdopted = (animal) => {
        
        this.adoptedList.push(new AdoptedAnimal(
            animal.image,
            animal.name,
            animal.type,
            animal.bread,
            animal.age));
        
    }

    removeFromAdopted = (animal) => {
        let index = this.adoptedList.findIndex(adoptedAnimal => adoptedAnimal.name === animal.name);
        this.adoptedList.splice(index, 1);
        
    }

}
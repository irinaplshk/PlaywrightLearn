import { fakerRU as faker } from '@faker-js/faker';

export class UserBuilder {
    constructor() {
        this.userData = {}; // Хранит только те свойства, которые были добавлены
    }


    addUser() {
        this.userData.username = faker.person.firstName();
        return this;
    }
    addEmail() {
           this.userData.email = faker.internet.email();
        return this;
    }
    addPassword(amount) {
        this.userData.password = faker.internet.password({ length: amount });
        return this;
    }


    generate() {
        return this.userData;
    }
}
// const { expect } = require('@wdio/globals')
// const LoginPage = require('../pageobjects/login.page')
// const SecurePage = require('../pageobjects/secure.page')

// describe('My Login application', () => {
//     it('should login with valid credentials', async () => {
//         await LoginPage.open()

//         await LoginPage.login('tomsmith', 'SuperSecretPassword!')
//         await expect(SecurePage.flashAlert).toBeExisting()
//         await expect(SecurePage.flashAlert).toHaveText(
//             expect.stringContaining('You logged into a secure area!'))
//     })
// })

// const { expect } = require('@wdio/globals')
const { expect } = require('chai');
const UserPage = require('../pageobjects/user.page');

describe('User API Test', () => {
    let userId;

    it('should create a user', async () => {
        const data = {
            name: 'Lutfi Farhan',
            email: 'lutfifarhan46@example.com', // Format email yang valid
            gender: 'male',
            status: 'active'
        };

        try {
            const response = await UserPage.createUser(data);
            expect(response.status).to.equal(201);
            expect(response.data).to.have.property('id'); // Periksa struktur respons
            userId = response.data.id;
        } catch (error) {
            console.error('Error creating user:', error.response ? error.response.data : error.message);
            throw error;
        }
    });

    it('should get a user', async () => {
        const response = await UserPage.getUser(userId);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id', userId);
        expect(response.data).to.have.property('name');
    });

    it('should update a user', async () => {
        const updateData = {
            name: 'Jane Doe'
        };

        const response = await UserPage.updateUser(userId, updateData);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('name', 'Jane Doe');
    });

    it('should delete a user', async () => {
        const response = await UserPage.deleteUser(userId);
        expect(response.status).to.equal(204);
    });
});

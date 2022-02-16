
/// <reference types="cypress"/>


export class Navigtion{

    customerLogin(){
        cy.visit('/')
        cy.get('button[ng-click="customer()"]').click()
        cy.get('form[ng-submit="showAccount()"]').then(customer =>{
            cy.wrap(customer).get('select[id="userSelect"]').select('Harry Potter')
            cy.wrap(customer).get('button[type="submit"]').click()
        })
    }

    mangerLogin(){
        cy.visit('/')
        cy.get('button[ng-click="manager()"]').click()
    }

}

export const navigateTo = new Navigtion()
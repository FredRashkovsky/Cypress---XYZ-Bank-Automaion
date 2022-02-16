/// <reference types="cypress"/>

export class customerFunctionsObject{

    getBalance(){
        return cy.get('strong.ng-binding').eq(1)
    }

    deposit(amount){
        cy.get('button[ng-click="deposit()"]').click()
        this.getBalance().invoke('text').then(balance =>{
            cy.get('form[ng-submit="deposit()"]').then(depositForm =>{
                cy.wrap(depositForm).find('input[ng-model="amount"]').type(amount)
                cy.wrap(depositForm).find('button[type="submit"]').click()
            
            cy.get('span[ng-show="message"]').should('contain', 'Deposit Successful')
            
            this.getBalance().should('contain', amount + parseInt(balance)) 

            })
        })

    }
    withdrawl(amount){
        cy.get('button[ng-click="withdrawl()"]').click()
        this.getBalance().invoke('text').then(balance =>{
                cy.get('form[ng-submit="withdrawl()"]').then(withdrawlForm =>{
                    cy.wrap(withdrawlForm).find('input[ng-model="amount"]').type(amount)
                    cy.wrap(withdrawlForm).find('button[type="submit"]').click()
                })
                if(balance != "0"){
                    cy.get('span[ng-show="message"]').should('contain', 'Transaction successful')
                    this.getBalance().should('contain', parseInt(balance) -  amount)
                }
                else{
                    cy.get('span[ng-show="message"]').should('contain', 'Transaction Failed. You can not withdraw amount more than the balance.')
                }
        
        })
        
    }
    transactions(data){
        cy.reload()
        cy.get('button[ng-click="transactions()"]').click()
        cy.get('tbody').then(table =>{
            cy.wrap(table).find('tr').each((trans, index) =>{
                cy.wrap(trans).find('td').eq(1).should('contain', Object.values(data[index])[0] )
                cy.wrap(trans).find('td').eq(2).should('contain', Object.keys(data[index])[0])
            })
        })
        cy.get('button[ng-click="back()"]').click()
    }
}

export const customerDoFuncation = new customerFunctionsObject()
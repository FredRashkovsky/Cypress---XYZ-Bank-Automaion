/// <reference types="cypress"/>

import { customerDoFuncation } from "../support/customerFuncations.spec"
import { navigateTo } from "../support/NevigationObject.spec"


describe('customerTests', ()=>{

    beforeEach('doThis', () =>{
        navigateTo.customerLogin()
    })

    it.only('smoke', () =>{
        let credit = 100
        let debit = 10
        let accounts = Array.from(cy.get('select[ng-hide="noAccount"] option').nextAll()).length
        for(let index = 0; index < accounts; index ++){
            cy.get('select[ng-hide="noAccount"]').select(index).click({force:true})
            customerDoFuncation.deposit(credit)
            customerDoFuncation.withdrawl(debit)
            customerDoFuncation.transactions([{"Credit":credit}, {"Debit":debit}])
        }
        
    })
    
    it('widthdrawl',() =>{
        customerDoFuncation.withdrawl(100)
    })
})
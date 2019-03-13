'use strict';

    /**
     * Contracting a loan
     * @param {org.svnit.comps.ContractingLoan} loan
     * @transaction
     */
    
    function contractingLoan( loan ){
      return getAssetRegistry('org.svnit.comps.Loan')
        .then(function(assetRegistry){
        var factory = getFactory()
        var loanId = loan.debtor.id + '' + loan.land.id + '' + loan.bank.id
        var loanAsset = factory.newResource('org.svnit.comps', 'Loan', loanId) 
        loanAsset.debtor = loan.debtor
        loanAsset.bank = loan.bank
        loanAsset.interestRate = loan.interestRate
        loanAsset.durationInMonths = loan.durationInMonths
        loanAsset.land = loan.land
        loanAsset.amount = loan.land.price
        return assetRegistry.add(loanAsset)
      })
    }
     
    /**
     * Requesting to Buy land
     * @param {org.svnit.comps.RequestLandTransaction} request
     * @transaction
     */
    
    async function requestLandTransaction( request ){
      if(request.land.state === 'onSale') {
        
        const landRegistry =  await getAssetRegistry('org.svnit.comps.Land');
        request.land.state = 'inTransit';
        await landRegistry.update(request.land);
        
        var factory = getFactory()
        var pendingLandId = request.land.id + '' + request.buyer.id + '' + request.seller.id + request.loan.id
        var pendingLandAsset = factory.newResource('org.svnit.comps', 'PendingLandTransaction', pendingLandId)

        pendingLandAsset.land = request.land
        pendingLandAsset.buyer = request.buyer
        pendingLandAsset.seller = request.seller
        pendingLandAsset.loan = request.loan
        pendingLandAsset.agent = request.agent
        pendingLandAsset.notary = request.notary
        pendingLandAsset.newDocumentSignature = request.newDocumentSignature
		

        
        
        const pendingLandRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction');
        await pendingLandRegistry.add(pendingLandAsset);
        
        
      } else {
        throw new Error('Land not on Sale or Intransit');
      }
    }
    
	/**
     * Setting land on Sale
     * @param {org.svnit.comps.SetLandOnSale} request
     * @transaction
     */

	async function SetLandOnSale( request ){
      request.land.state = 'onSale';
      const pendingLandRegistry =  await getAssetRegistry('org.svnit.comps.Land');
      await pendingLandRegistry.update(request.land);
    }

    /**
     * Requesting to Buy land
     * @param {org.svnit.comps.ApprovePendingLandTransaction} request
     * @transaction
     */
    
    async function approvePendingLandTransaction( request ){
      
      let trade = request.pendingLandTransaction
      
      if(request.approve === true) {
        trade.land.state = 'notOnSale'
        var notaryFees = 0.1 * trade.land.price
        var agentFees = trade.agent.feeRate * trade.land.price
        var totalCost = notaryFees + agentFees 
    
        console.log('@debug notaryFees' + notaryFees)
        console.log('@debug notaryBefore' + trade.notary.balance)
        console.log('@debug Seller Before' + trade.seller.balance)
        // Updates the seller's balance
    
        console.log('@debug Tot' + totalCost)
        trade.seller.balance += trade.land.price
    
        // Check if the buyer has enough to pay the notary, real estate agent and insurance
        console.log('@debug buyer' +trade.buyer.balance)
        if( trade.buyer.balance < totalCost ){
          throw new Error('Not enough funds to buy this!')
        }
        console.log('@debug After check')
        trade.buyer.balance -= totalCost
        trade.land.owner = trade.buyer
        trade.land.documentSignature = trade.newDocumentSignature
        trade.agent.balance += agentFees
        trade.notary.balance += notaryFees
        console.log('@debug notary After' + trade.notary.balance)
        console.log('@debug Seller After' + trade.seller.balance);
    
        const realIndividualRegistry =  await getParticipantRegistry('org.svnit.comps.PrivateIndividual');
        await realIndividualRegistry.update(trade.seller);
        await realIndividualRegistry.update(trade.buyer);
    
        const realNotaryRegistry =  await getParticipantRegistry('org.svnit.comps.Notary')
        await realNotaryRegistry.update(trade.notary)
    
        const agentRegistry =  await getParticipantRegistry('org.svnit.comps.Agent')
        await agentRegistry.update(trade.agent)
    
        const landRegistry =  await getAssetRegistry('org.svnit.comps.Land')
        await landRegistry.update(trade.land)
        
        const pendingLandTransactionRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction')
        await pendingLandTransactionRegistry.remove(trade)
        
      } else {
        const pendingLandRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction')
        await pendingLandRegistry.remove(trade)
      }
      
    }
   
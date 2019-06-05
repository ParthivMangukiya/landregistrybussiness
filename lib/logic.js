'use strict';



    /**
     * Contracting a loan
     * @param {org.svnit.comps.ContractingLoan} loan
     * @transaction
     */
    /*
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
    }*/


     
    /**
     * Requesting to Buy land
     * @param {org.svnit.comps.RequestLandTransaction} request
     * @transaction
     */
    
    async function requestLandTransaction( request ){
      if(request.land.state === 'onSale') {
        
        const participantRegistry = await getParticipantRegistry('org.svnit.comps.PrivateIndividual');
        const landRegistry =  await getAssetRegistry('org.svnit.comps.Land');
        const notaryRegistry =  await getParticipantRegistry('org.svnit.comps.Notary')
        const agentRegistry =  await getParticipantRegistry('org.svnit.comps.Agent')
        
        var exists = await agentRegistry.exists(request.agent.id);
        if(!exists) {
          throw new Error('Agent does not exists');
        }
        exists = await notaryRegistry.exists(request.notary.id);
        if(!exists) {
          throw new Error('Notary does not exists');
        }
        exists = await participantRegistry.exists(request.buyer.id);
        if(!exists) {
          throw new Error('Buyer does not exists');
        }
        exists = await participantRegistry.exists(request.seller.id);
        if(!exists) {
          throw new Error('Seller does not exists');
        }
        
        request.land.state = 'inTransit';
        await landRegistry.update(request.land);
        
        var factory = getFactory()
        var pendingLandId = request.land.id + '' + request.buyer.id + '' + request.seller.id
        var pendingLandAsset = factory.newResource('org.svnit.comps', 'PendingLandTransaction', pendingLandId)

        pendingLandAsset.land = request.land
        pendingLandAsset.buyer = request.buyer
        pendingLandAsset.seller = request.seller
        pendingLandAsset.agent = request.agent
        pendingLandAsset.notary = request.notary
        
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
      
      const landRegistry =  await getAssetRegistry('org.svnit.comps.Land');
      var exists = await landRegistry.exists(request.land.id);
      if(!exists) {
        throw new Error('Land does not exists');
      }
      if(request.land.state == "notOnSale") {
        request.land.state = "onSale";
        await landRegistry.update(request.land);
      } else if(request.land.state == "onSale") {
        request.land.state = "notOnSale";
        await landRegistry.update(request.land);
      } else {
        throw new Error('Land is in transit');
      }
    }

    /**
     * Requesting to Buy land
     * @param {org.svnit.comps.ApprovePendingLandTransactionBuyer} request
     * @transaction
     */
    
    async function approvePendingLandTransactionBuyer( request ){
      
      let trade = request.pendingLandTransaction
      
      if(trade.state != "requestedBuyer") {
          throw new Error('not requested to buyer');
      }
      
      if(request.approve === true) {
        
       	const pendingLandTransactionRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction') 
        if(trade.newDocumentSignature != request.newDocumentSignature) {
        	throw new Error('Signature does not match');
        }
        trade.state = 'requestedLandDepartment'
        await pendingLandTransactionRegistry.update(trade)
        
      } else {
        const pendingLandRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction')
        const landRegistry =  await getAssetRegistry('org.svnit.comps.Land')
        trade.land.state = 'onSale'
        await landRegistry.update(trade.land)
        await pendingLandRegistry.remove(trade)
      }
    }

	/**
     * Requesting to Buy land
     * @param {org.svnit.comps.ApprovePendingLandTransactionSeller} request
     * @transaction
     */

	async function approvePendingLandTransactionSeller( request ){
      
      let trade = request.pendingLandTransaction
      
      if(trade.state != "requestedSeller") {
          throw new Error('not requested to seller');
      }
      
      if(request.approve === true) {
        
       	const pendingLandTransactionRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction') 
        if(trade.newDocumentSignature != request.newDocumentSignature) {
        	throw new Error('Signature does not match');
        }
        trade.state = 'requestedBuyer'
        await pendingLandTransactionRegistry.update(trade)
        
      } else {
        const pendingLandRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction')
        const landRegistry =  await getAssetRegistry('org.svnit.comps.Land')
        trade.land.state = 'onSale'
        await landRegistry.update(trade.land)
        await pendingLandRegistry.remove(trade)
      }
      
    }

	/**
     * Requesting to Buy land
     * @param {org.svnit.comps.ApprovePendingLandTransactionNotary} request
     * @transaction
     */

	async function approvePendingLandTransactionNotary( request ){
      
      let trade = request.pendingLandTransaction
      
      if(trade.state != "requestedNotary") {
          throw new Error('not requested to notary');
      }
      
      if(request.approve === true) {
        
       	const pendingLandTransactionRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction') 
        trade.newDocumentSignature = request.newDocumentSignature
        trade.state = 'requestedSeller'
        await pendingLandTransactionRegistry.update(trade)
        
      } else {
        const pendingLandRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction')
        const landRegistry =  await getAssetRegistry('org.svnit.comps.Land')
        trade.land.state = 'onSale'
        await landRegistry.update(trade.land)
        await pendingLandRegistry.remove(trade)
      }
      
    }


	/**
     * Requesting to Buy land
     * @param {org.svnit.comps.ApprovePendingLandTransaction} request
     * @transaction
     */
    
    async function approvePendingLandTransaction( request ){
      
      let trade = request.pendingLandTransaction
      
      if(trade.state != "requestedLandDepartment") {
          throw new Error('not requested to land department');
      }
      
      if(request.approve === true) {
        
        const realIndividualRegistry =  await getParticipantRegistry('org.svnit.comps.PrivateIndividual');
        const realNotaryRegistry =  await getParticipantRegistry('org.svnit.comps.Notary')
        const agentRegistry =  await getParticipantRegistry('org.svnit.comps.Agent')
        const landRegistry =  await getAssetRegistry('org.svnit.comps.Land')
        const pendingLandTransactionRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction')
        
        var exists = await realNotaryRegistry.exists(trade.notary.id);
        if(!exists) {
          throw new Error('Notary does not exists');
        }
        exists = await agentRegistry.exists(trade.agent.id);
        if(!exists) {
          throw new Error('Agent does not exists');
        }
        exists = await realIndividualRegistry.exists(trade.buyer.id);
        if(!exists) {
          throw new Error('Buyer does not exists');
        }
        exists = await realIndividualRegistry.exists(trade.seller.id);
        if(!exists) {
          throw new Error('Seller does not exists');
        }
        
        if(trade.newDocumentSignature != request.newDocumentSignature) {
        	throw new Error('Signature does not match');
        }
        
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
    
        await realIndividualRegistry.update(trade.seller);
        await realIndividualRegistry.update(trade.buyer);
        await realNotaryRegistry.update(trade.notary)
        await agentRegistry.update(trade.agent)
        await landRegistry.update(trade.land)
        await pendingLandTransactionRegistry.remove(trade)
        
      } else {
        const pendingLandRegistry =  await getAssetRegistry('org.svnit.comps.PendingLandTransaction')
        const landRegistry =  await getAssetRegistry('org.svnit.comps.Land')
        trade.land.state = 'onSale'
        await landRegistry.update(trade.land)
        await pendingLandRegistry.remove(trade)
      }
      
    }
   
    /**
     * Setting land on Sale
     * @param {org.svnit.comps.temp} request
     * @transaction
     */

/*
async function temp( request ){
     console.log('@debug') 
    var results = await query('selectHistorian')
    //var results = await query('selectLand',{id:"3"})
     for (var n = 0; n < results.length; n++) {
        var land = results[n];
  		console.log('@debug ' + land.toString())
       console.log(land)
     }
  }
*/

/**
* Sample transaction
* @param {org.svnit.comps.getLandHistoryForId} transaction
 @returns {String}
* @transaction
*/
async function getLandHistoryForId(transaction) {
  const landId = transaction.landId
  const nativeSupport = transaction.nativeSupport;

  const assetRegistry = await getAssetRegistry('org.svnit.comps.Land')

  const nativeKey = getNativeAPI().createCompositeKey('Asset:org.svnit.comps.Land', [landId]);
  const iterator = await getNativeAPI().getHistoryForKey(nativeKey);
  let results = [];
  let res = {done : false};
  while (!res.done) {
      res = await iterator.next();

      if (res && res.value && res.value.value) {
          let val = res.value.value.toString('utf8');
        	let obj = res.value.value;
          if (val.length > 0) {
              	results.push(val);
          }
      }
      if (res && res.done) {
          try {
              iterator.close();
          }
          catch (err) {
          }
      }
  }

  //console.log('@debug ' + results.toString())
  //console.log(results)
  let retStr = '[' + results.toString() + ']'
  console.log('@debug ' + retStr)
  return retStr
}
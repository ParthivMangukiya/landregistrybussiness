curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Agent",
  "id": "1",
  "name": "sureshbhai",
  "balance": 10000,
  "feeRate": 0.1
}
' 'http://localhost:3001/api/Agent'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Bank",
  "id": "1",
  "name": "sbi",
  "balance": 1000000000
}
' 'http://localhost:3001/api/Bank'


curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Notary",
  "id": "1",
  "name": "jasmin",
  "address": "Surat",
  "balance": 10000
}
' 'http://localhost:3001/api/Notary'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Land",
  "id": "1",
  "address": "land1",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l1",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#1"
}
' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Land",
  "id": "2",
  "address": "land2",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l2",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#1"
}
' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Land",
  "id": "3",
  "address": "land3",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l3",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#1"
}

' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Land",
  "id": "4",
  "address": "land4",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l4",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#2"
}
' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '

{
  "$class": "org.svnit.comps.Land",
  "id": "5",
  "address": "land5",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l5",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#2"
}
' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.ContractingLoan",
  "debtor": "resource:org.svnit.comps.PrivateIndividual#2",
  "bank": "resource:org.svnit.comps.Bank#1",
  "land": "resource:org.svnit.comps.Land#1",
  "interestRate": 0.1,
  "durationInMonths": 20
}
' 'http://localhost:3001/api/ContractingLoan'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.ContractingLoan",
  "debtor": "resource:org.svnit.comps.PrivateIndividual#2",
  "bank": "resource:org.svnit.comps.Bank#1",
  "land": "resource:org.svnit.comps.Land#2",
  "interestRate": 0.1,
  "durationInMonths": 18
}
' 'http://localhost:3001/api/ContractingLoan'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.ContractingLoan",
  "debtor": "resource:org.svnit.comps.PrivateIndividual#1",
  "bank": "resource:org.svnit.comps.Bank#1",
  "land": "resource:org.svnit.comps.Land#4",
  "interestRate": 0.1,
  "durationInMonths": 10
}
' 'http://localhost:3001/api/ContractingLoan'

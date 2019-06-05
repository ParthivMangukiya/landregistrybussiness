curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Agent",
  "id": "5001",
  "name": "sureshbhai",
  "balance": 10000,
  "feeRate": 0.1
}
' 'http://localhost:3001/api/Agent'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Bank",
  "id": "3001",
  "name": "sbi",
  "balance": 1000000000
}
' 'http://localhost:3001/api/Bank'


curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Notary",
  "id": "4001",
  "name": "jasmin",
  "address": "Surat",
  "balance": 10000
}
' 'http://localhost:3001/api/Notary'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Land",
  "id": "6001",
  "address": "land1",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l1",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#1001"
}
' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Land",
  "id": "6002",
  "address": "land2",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l2",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#1001"
}
' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Land",
  "id": "6003",
  "address": "land3",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l3",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#1001"
}

' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.Land",
  "id": "6004",
  "address": "land4",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l4",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#1002"
}
' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '

{
  "$class": "org.svnit.comps.Land",
  "id": "6005",
  "address": "land5",
  "squareMeters": 200,
  "price": 2000,
  "documentSignature": "l5",
  "state": "notOnSale",
  "owner": "resource:org.svnit.comps.PrivateIndividual#1002"
}
' 'http://localhost:3001/api/Land'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.ContractingLoan",
  "debtor": "resource:org.svnit.comps.PrivateIndividual#1002",
  "bank": "resource:org.svnit.comps.Bank#3001",
  "land": "resource:org.svnit.comps.Land#6001",
  "interestRate": 0.1,
  "durationInMonths": 20
}
' 'http://localhost:3001/api/ContractingLoan'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.ContractingLoan",
  "debtor": "resource:org.svnit.comps.PrivateIndividual#1002",
  "bank": "resource:org.svnit.comps.Bank#3001",
  "land": "resource:org.svnit.comps.Land#6002",
  "interestRate": 0.1,
  "durationInMonths": 18
}
' 'http://localhost:3001/api/ContractingLoan'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "$class": "org.svnit.comps.ContractingLoan",
  "debtor": "resource:org.svnit.comps.PrivateIndividual#1001",
  "bank": "resource:org.svnit.comps.Bank#3001",
  "land": "resource:org.svnit.comps.Land#6004",
  "interestRate": 0.1,
  "durationInMonths": 10
}
' 'http://localhost:3001/api/ContractingLoan'

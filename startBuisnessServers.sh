composer network install --card PeerAdmin@hlfv1 --archiveFile landregistry@0.0.2.bna

composer network start --networkName landregistry --networkVersion 0.0.2 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@landregistry

export COMPOSER_PROVIDERS='{
    "github": {
      "provider": "github",
      "module": "passport-github",
      "clientID": "7c0ca512b75c317eb016",
      "clientSecret": "6c208137fd395b82611ff6522d60583123034155",
      "authPath": "/auth/github",
      "callbackURL": "/auth/github/callback",
      "successRedirect": "http://localhost:4200/Login?loggedIn=true",
      "failureRedirect": "/"
    }
}'
#composer-rest-server -c admin@landregistry -n never -a true -m true -u true -d n &

#composer-rest-server -c admin@landregistry -n never -u true -p 3001 &


import requests

data = {
    "name": "KGP2",
    "description": "In the 1970s, a gangster named Rocky goes undercover as a slave to assassinate the owner of a notorious gold mine known as the Kolar Gold Fields.",
    "premiereDate": "1999-06-02T00:00:00.000Z",
    "endDate": "1999-06-02T00:00:00.000Z",
    "price": 1000,
}

print(requests.post("http://localhost:8000/api/movie/create", json=data))



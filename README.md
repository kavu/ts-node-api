# TypeScript Backend Server

## Description

Hi! It's my small learning project about making working backend API using TypeScipt and Node.js.

Is is using minimal amount of external dependencies:

* TypeScript - as language of choise, but still it will be transpiled to JavaScript;
* Express - as a core of an API and it's endpoints;
* TypeORM - as database access layer, a long with a handy migrations mechanism;
* Postgres - as a database.

The API istself consists of just 3 endpoints:

### New Deck

```bash
curl --request POST \
  --url http://localhost:3000/decks/new \
  --header 'Content-Type: application/json' \
  --data '{"shuffled": true,"type": "FULL"}'
```

```json
{
    "type": "FULL",
    "shuffled": true,
    "deckId": "d85b5842-f5aa-4038-9cee-8d0bc68611a7",
    "remaining": 52
}
```

It will create a deck of playing cards for you. `shuffled` denotes if you want to shuffle your deck upon creation. And `type` can be `"FULL"` for creating full-sized 52 cards deck, and `"SHORT"` for creating smaller 36 cards deck.

### Open Deck

```bash
curl --request POST \
  --url http://localhost:3000/decks/8db86880-1d8b-4242-a63d-711662e9cb92/open
```

```json
{
    "deckId": "8db86880-1d8b-4242-a63d-711662e9cb92",
    "type": "FULL",
    "shuffled": true,
    "remaining": 9,
    "cards": [{
            "code": "3C",
            "suit": "CLUBS",
            "value": "3"
        },
        {
            "code": "AD",
            "suit": "DIAMONDS",
            "value": "ACE"
        },
        {
            "code": "7H",
            "suit": "HEARTS",
            "value": "7"
        },
        {
            "code": "9S",
            "suit": "SPADES",
            "value": "9"
        },
        {
            "code": "KD",
            "suit": "DIAMONDS",
            "value": "KING"
        },
        {
            "code": "8S",
            "suit": "SPADES",
            "value": "8"
        },
        {
            "code": "AC",
            "suit": "CLUBS",
            "value": "ACE"
        },
        {
            "code": "6S",
            "suit": "SPADES",
            "value": "6"
        },
        {
            "code": "7C",
            "suit": "CLUBS",
            "value": "7"
        }
    ]
}
```

This endpoint shows what is inside the deck, provides `remaining` list of `cards`. In this example request we see the deck with only 9 cards `remaining`, from initial 52 cards of the `"FULL"` deck.

### Draw Cards

```bash
curl --request POST \
  --url 'http://localhost:3000/decks/8db86880-1d8b-4242-a63d-711662e9cb92/draw?count=3'
```

```json
{
    "cards": [{
            "code": "3C",
            "suit": "CLUBS",
            "value": "3"
        },
        {
            "code": "AD",
            "suit": "DIAMONDS",
            "value": "ACE"
        },
        {
            "code": "7H",
            "suit": "HEARTS",
            "value": "7"
        }
    ]
}
```

As you may expect we are drawing the cards from the top of the deck. We can specify amount of the cards drawn by the `count` parameter.

## Running

Running the API is as simple as `docker-compose up`. You should be have 2 containers running - one with Postgres, and one with the app itself. API container prior to start should run the TypeORM migration tool and create all the tables needed, seed the database with required data (possible cards).

## Development

Starting local development is a bit tricky.

First of all you need you Postgres started with 2 databases: `cards_api` and `cards_api_test`. Usually you can do it with `createdb` utility: `createdb -h localhost --username=postgres cards_api_test`. By the way, all app settings regarding DB connection can be controlled with environment variabled: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

Next you'll need your dependencies, we'll be using `yarn`: `yarn install`.

Now you can do you migrations: `yarn migrate` and `yarn migrate:test`.

Now you can run the tests: `yarn test`.

Or you can build `yarn build` and after that start `yarn start` the app.

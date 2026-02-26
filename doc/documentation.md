# Zoosino
## Atuhors
- Zdeněk Relich
- Filip Heger
- Martin Pop
- Jan Čihař
- Zhao Xiang Yang

## Purpose
The program is for students and teachers of SPŠE Ječná. It is a website, where a user can collect points and compete with other users. The user gets points in different minigames like Turtlette, Sloth and PengJack.

### Minigames
- PengJack  
A card game in which the player and their opponent each receive one card.  The player can say that they don't want to draw any more cards, or they can draw another card. Their goal is to get as close as possible to the number that the penguin comes up with. If they win, they get 200 points; if they lose, they get 1 point.

- Turtlette  
The turtle will run in a circle, and the player must guess what number it will reach. If they guess correctly, they get 10,000 points; if they guess incorrectly, they get 1 point.

- Sloth  
The sloth drops 3 random fruits from the tree. If they are the same, the player gets 100,000 points; if not, they get 1 point.

## Stakeholders
- user (player)

## Usecases
- Registration/login
- Minigame choice
- Point collection

## Requirements
### Functional
- FR1: Registration  
    The user creates an account, which is stored in database.
- FR2: Login using web-created account    
    The user can log into an existing account(prefferably his/her) created with our web server.
- FR3: Login using Microsoft/Google account  
    The user can log into an existing Microsoft/Google account.

### Qualitative
- QR1: Zoo theme  
    The web page uses animalistic theme for family-friendly environment.

## Technical approach
### VPS
**Hetzner**:
- cost: 6,04€/month
- setup: easy
- speed: fast
### Database server
**MySQL**:
- cost: free
- setup: easy
- speed: fast
### Frontend
**PHP**:
- framework: symfony
- cost: free

## Contribution
- F. Heger:
    - VPS deployment
    - database setup
- M. Pop:
    - frontend
    - registration
    - login
    - guest acces
    - Turtlette minigame
- J. Čihař:
- Z. Relich:
    - documentation
- Z. X. Yang:
    - teamleading
    - project management

## Contacts
- relich@spsejecna.cz
- heger@spsejecna.cz
- pop@spsejecna.cz
- cihar@spsejecna.cz
- yang@spsejecna.cz
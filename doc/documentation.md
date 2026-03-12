# Zoosino
## Authors
- Zdeněk Relich
- Filip Heger
- Martin Pop
- Jan Čihař
- Zhao Xiang Yang

## Purpose
The program is for students, teachers and other workers of SPŠE Ječná. It is a website, where a user can collect points and compete with other players. The player gets points in different minigames like Turtlette, Sloth and PengJack.

### Minigames
- PengJack  
A card game in which the player and their opponent each receive one card. The player can say that they don't want to draw any more cards, or they can draw another card. Their goal is to get as close as possible to, but less or equal to 21. If they win, they get 5,000 points. If they lose, they get 1 point.

- Turtlette  
The player picks a number from 0 to 36, than spin the roulette. If they guess correctly, they get 10,000 points. If they guess incorrectly, they get 1 point.

- Sloth  
The sloth drops 3 random fruits from the tree. If they are the same, the player gets 100,000 points. If not, they get 1 point.

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
- FR3: Playable minigames  
    The minigames
- FR4: Traffic tracking  
    The app tracks visiting from users and saves this data.
- FR5: Site security  
    The site is secure against cyber-attacks.
### Qualitative
- QR1: Zoo theme  
    The web page uses animalistic theme for family-friendly environment.
- QR2: Responsivity
    The web page responds to display size.
- QR3: Fast loading  
    The web page loads.
- QR4: Starting game using spacebar  
    Clicking spacebar starts the game.
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
### Backend
**PHP**:
- framework: Symfony
- cost: free
**Caddy**
- cost: free
- setup: easy
- speed: fast
- feature: fetches certificates
### Frontend
**TypeScript**
- framework: React
- cost: free
**CSS**
- framework: Tailwind
- cost: free

## Contribution
- F. Heger:
    - VPS deployment
    - Grafana setup
    - database setup
        - prod
        - test
    - security
    - logging
    - creating a GitHub repository
- M. Pop:
    - frontend
      - layout/navigation
      - registration
      - login
      - guest access
      - Turtlette
      - Sloth
      - PengJack
      - leaderboard
    - poster
- J. Čihař:
    - backend
    - API server
      - login
      - registration
      - leaderboard
      - Sloth
      - Turtlette
      - PengJack
      - traffic tracking
    - sessions
    - cookies
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

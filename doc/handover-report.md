# Handover report
## Project name: Zoosino
### Description
The program is for students, teachers and other workers of SPŠE Ječná. It is a website, where a user can collect points and compete with other players. The player gets points in different minigames like Turtlette, Sloth and PengJack.

#### Minigames
- PengJack  
  A card game in which the player and their opponent each receive one card. The player can say that they don't want to draw any more cards, or they can draw another card. Their goal is to get as close as possible to, but less or equal to 21. If they win, they get 5,000 points. If they lose, they get 1 point.

- Turtlette  
  The player picks a number from 0 to 36, than spin the roulette. If they guess correctly, they get 10,000 points. If they guess incorrectly, they get 1 point.

- Sloth  
  The sloth drops 3 random fruits from the tree. If they are the same, the player gets 100,000 points. If not, they get 1 point.
### Team
- Filip Heger
  - Sysadmin
- Jan Čihař
    - Backend
- Martin Pop
    - Frontend
- Zdeněk Relich
    - Documentation
- Zhao Xiang Yang
    - Scrum master
#### Contacts
- relich@spsejecna.cz
- heger@spsejecna.cz
- pop@spsejecna.cz
- cihar@spsejecna.cz
- yang@spsejecna.cz
### Goals
The goal of this project is the entertainment of its users.
### Stakeholders
| Role                  | Type     | Inlfuence | Interest |
|:----------------------|:---------|:----------|:---------|
| Player                | External | Low       | High     |
| School administration | External | Medium    | High     |
| Development team      | Internal | High      | Medium   |
### Use cases
| Name              | Description                           | Actor                    |
|:------------------|:--------------------------------------|:-------------------------|
| Start game        | The player starts a new game.         | Player                   |
| Submit score      | The player sends games score.         | Player                   |
| View leaderboard  | The user views the leaderboard        | Player, Development team |
| Reset leaderboard | The dev team deletes the leaderboard. | Development team         |
| ZOO theme         | The frontend uses a ZOO theme.        | Player                   |
### Requirements
| ID          | Name                     | Description                                                     | Type        | Source                      | Verification                  |
|:------------|:-------------------------|:----------------------------------------------------------------|:------------|:----------------------------|:------------------------------|
| REQ-FUNC-01 | Starting a game          | The system must let the player start a game.                    | Functional  | Use Case: Start game        | Passed game start test        |
| REQ-FUNC-02 | Saving a score           | The system must let the player save a score into a database.    | Functional  | Use Case: Submit score      | Passed score submit test      |
| REQ-FUNC-03 | Viewing the leaderboard  | The system must let the user view the current leaderboard.      | Functional  | Use Case: View leaderboard  | Passed leaderboard view test  |
| REQ-FUNC-04 | Reseting the leaderboard | The system must let the dev team empty the current leaderboard. | Functional  | Use Case: Reset leaderboard | Passed leaderboard reset test |
| REQ-QUAL-01 | ZOO theme                | The visual must use a ZOO theme.                                | Qualitative | Use Case: Reset leaderboard | Visual test                   |

### Tech stack
#### Server
| Technology | Performance | Ease of implementation | Feature                            |
|:-----------|:------------|:-----------------------|:-----------------------------------|
| Caddy      | 4 * 4       | 5 * 3                  | Automatically handles certificates |
| Nginx      | 5 * 4       | 4 * 3                  | X                                  |
| Apache     | 3 * 4       | 3 * 3                  | X                                  |

### Backend

### Frontend

### Evaluation:
Zoosino is a functional prototype of a gaming platform with well-designed user account logic. The project successfully implements core features, including the management of virtual funds and leaderboards. A significant advantage is the barrier-free access system (Guest mode), which facilitates immediate testing of the application. The minimalist interface offers a stable technical foundation and clean code that can be effectively built upon.

#### Issues:
Vulnerability to automation: The application is currently susceptible to the use of automated tools and scripts. Since there is no game mechanic that allows points to be lost, a user can increase their balance indefinitely without risk.

#### Opportunities for further development:
Game content offerings: Add new types of casino games
Expand gamification: Implement daily rewards, achievements, or more advanced player statistics to increase motivation and retention
Improve animations: Make games more dynamic and visually appealing for a better user experience
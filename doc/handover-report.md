# Handover report

## Project name: Zoosino

### 1. Description
The program is for students, teachers and other workers of SPŠE Ječná. It is a website, where a user can collect points and compete with other players. The player gets points in different minigames like Turtlette, Sloth and PengJack.

#### 1.1. Minigames
##### 1.1.1. PengJack  
  A card game in which the player and their opponent each receive one card. The player can say that they don't want to draw any more cards, or they can draw another card. Their goal is to get as close as possible to, but less or equal to 21. If they win, they get 5,000 points. If they lose, they get 1 point.

##### 1.1.2. Turtlette  
  The player picks a number from 0 to 36, than spin the roulette. If they guess correctly, they get 10,000 points. If they guess incorrectly, they get 1 point.

##### 1.1.3. Sloth  
  The sloth drops 3 random fruits from the tree. If they are the same, the player gets 100,000 points. If not, they get 1 point.

### 1.2 Team
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

#### 1.2.1. Contacts
- relich@spsejecna.cz
- heger@spsejecna.cz
- pop@spsejecna.cz
- cihar@spsejecna.cz
- yang@spsejecna.cz
---

### 2. Goals  
The goal of this project is the entertainment of its users.

---

### 3. Stakeholders
| Role                  | Type     | Inlfuence | Interest |
|:----------------------|:---------|:----------|:---------|
| Player                | External | Low       | High     |
| Development team      | Internal | High      | Medium   |
---

### 4. Use cases
| Name                      | Description                                                | Actor                         |
|:--------------------------|:-----------------------------------------------------------|:------------------------------|
| Register / login          | The player can create an acount and log into this account. | Player                        |
| Start game                | The player starts a new game.                              | Player                        |
| Submit score              | The player sends games score.                              | Player                        |
| View leaderboard          | The user views the leaderboard                             | Player, Development team      |
| Traffic tracking          | The app tracks its traffic.                                | Development team              |
| Web server usage          | The app must run on a web server.                          | Player, Development team      |
| ZOO theme                 | The frontend uses a ZOO theme.                             | Player                        |
---

### 5. Requirements
| ID          | Name                      | Description                                                  | Type        | Source                              | Verification                   |
|:------------|:--------------------------|:-------------------------------------------------------------|:------------|:------------------------------------|:-------------------------------|
| REQ-FUNC-01 | Starting a game           | The system must let the player start a game.                 | Functional  | Use Case: Start game                | Passed game start test         |
| REQ-FUNC-02 | Saving a score            | The system must let the player save a score into a database. | Functional  | Use Case: Submit score              | Passed score submit test       |
| REQ-FUNC-03 | Viewing the leaderboard   | The system must let the user view the current leaderboard.   | Functional  | Use Case: View leaderboard          | Passed leaderboard view test   |
| REQ-FUNC-04 | Traffic tracking          | The app must track its traffic.                              | Functional  | Use Case: Traffic tracking          | Passed traffic tracing test    |
| REQ-FUNC-05 | Web server usage          | The app must run on a web server.                            | Functional  | Use Case: Web server usage          | Passed web server request test |
| REQ-FUNC-06 | Register / login          | The player can create an acount and log into this account.   | Functional  | Use Case: Register / login          | Passed register / login test   |
| REQ-QUAL-01 | ZOO theme                 | The visual must use a ZOO theme.                             | Qualitative | Use Case: Reset leaderboard         | Visual test                    |
---

### 6. Tech stack
#### 6.1. Server
| Technology | Performance | Ease of implementation | HTTPS     | Score  |
|:-----------|:------------|:-----------------------|:----------|:-------|
| Caddy      | 4 * 4       | 5 * 3                  | Automatic | **31** |
| Nginx      | 5 * 4       | 3 * 3                  | Manual    | 29     |
| Apache     | 3 * 4       | 2 * 3                  | Manual    | 18     |

#### 6.2. Backend
| Technology            | Performance | Learning curve | Architecture  | Score  |
|:----------------------|:------------|:---------------|:--------------|:-------|
| PHP 8.4 (Symfony 7)   | 5 * 4       | 4 * 3          | Strict        | **32** |
| Python (Flask)        | 4 * 4       | 4 * 3          | Mild          | 28     |
| JavaScript (Express)  | 2 * 4       | 3 * 3          | Mild - Medium | 17     |

#### 6.3. Frontend
| Technology | Performance | Learning curve | Comunity | Architecture | Score  |
|:-----------|:------------|:---------------|:---------|:-------------|:-------|
| React      | 4 * 4       | 4 * 3          | 5 * 2    | Strict       | **28** |
| Vue.js     | 3 * 4       | 3 * 3          | 3 * 2    | Mild         | 21     |
---
### 8. Requirement traceability
| Requirement ID | Use Case                | Component                              | Implementation                                                      |
|:---------------|:------------------------|:---------------------------------------|:--------------------------------------------------------------------|
| REQ-FUNC-01    | Start game              | Backend API, GameButton                | PengjackController, RoulleteController, SlothController, GameButton |
| REQ-FUNC-02    | Submit score            | Backend API                            | PengjackController, RoulleteController, SlothController             |
| REQ-FUNC-03    | Viewing the leaderboard | Backend API, LeaderboardPage           | UserController, LeaderboardPage, LeaderboardRow                     |
| REQ-FUNC-04    | Traffic tracking        | Backend API                            | TrackingController                                                  |
| REQ-FUNC-05    | Web server usage        | VPS                                    | Caddy web server                                                    |
| REQ-FUNC-06    | Register / login        | BackendAPI, RegisterPage, LoginPage    | UserController, RegisterPage, LoginPage                             |
| REQ-QUAL-01    | ZOO theme               | PengjackPage, SlothPage, TurtlettePage | Caddy web server                                                    |

---
### 9. Implementation

#### 9.1 Frontend
| Component / File       | Directory                         | Purpose                                                                                                      |
|:-----------------------|:----------------------------------|:-------------------------------------------------------------------------------------------------------------|
| `Layout.tsx`           | `/src`                            | Provides the main structural wrapper (header, main content area) used consistently across all pages.         |
| `ProtectedRoute.tsx`   | `/src/components`                 | Router guard to prevent unauthenticated users.                                                               |
| `Navigation.tsx`       | `/src/components/navigation`      | Handles the primary global navigation menu and routing links throughout the application.                     |
| `BalanceDisplay.tsx`   | `/src/components`                 | Shows the player's current virtual currency or token balance across different views and games.               |
| `GameCard.tsx`         | `/src/components`                 | A reusable UI card that displays a game's preview image, title, and a link to start playing.                 |
| `SlothMachine.tsx`     | `/src/components/games/sloth`     | Renders the core interactive slot-machine mechanics and animations for the Sloth game.                       |
| `TurtletteWheel.tsx`   | `/src/components/games/turtlette` | Manages the visual rendering and spinning logic of the roulette wheel for the Turtlette game.                |
| `PengjackHand.tsx`     | `/src/components/games/pengjack`  | Displays the state of the player's or dealer's current set of cards in the blackjack-style game.             |
| `HomePage.tsx`         | `/src/pages`                      | Serves as the main landing page showcasing available games and welcoming the user.                           |
| `AccountPage.tsx`      | `/src/pages`                      | The primary dashboard where users can view their profile details, edit fields, and track their stats.        |
| `api.ts`               | `/src/lib`                        | Contains axios instance for making network requests to the backend server.                                   |
| `auth.tsx`             | `/src/lib`                        | Manages authentication state, user session context, and login/logout logic.                                  |
| `FormField.tsx`        | `/src/components/form`            | A reusable form input wrapper that handles user input and labeling.                                          |
| `GameButton.tsx`       | `/src/components/games`           | A standardized, styled button component designed specifically for some game interaction.                     |
| `GameNotification.tsx` | `/src/components/games`           | Displays temporary, contextual alerts to inform the player about game outcomes like wins, losses, or errors. |
| `PengjackCard.tsx`     | `/src/components/games/pengjack`  | Renders the visual representation of a single playing card with its specific suit and value.                 |
| `TurtletteBoard.tsx`   | `/src/components/games/turtlette` | Manages the interactive betting layout before spinning the wheel.                                            |
| `LeaderboardRow.tsx`   | `/src/components/leaderboard`     | Displays an individual player's position, username, and score within the main leaderboard table.             |
| `usePageTitle.ts`      | `/src/hooks`                      | A custom React hook that dynamically updates the browser tab title based on the currently active route.      |
| `theme-provider.tsx`   | `/src/lib`                        | Manages the global UI theme state (light and dark mode).                                                     |
| `tracking.ts`          | `/src/lib`                        | Contains the utility functions for tracking new users                                                        |

#### 9.2 Backend
| Component / File         | Directory            | Purpose                                      |
|:-------------------------|:---------------------|:---------------------------------------------|
| `PengjackController.php` | `src/Controller/Api` | Serves endpoints for the PengJack minigame.  |
| `RouletteController.php` | `src/Controller/Api` | Serves endpoints for the Turtlette minigame. |
| `SlothController.php`    | `src/Controller/Api` | Serves endpoints for the Sloth minigame.     |
| `TrackingController.php` | `src/Controller/Api` | Serves endpoints for the tracking of visits. |
| `UserController.php`     | `src/Controller/Api` | Serves endpoints for the users actions.      |
| `User.php`               | `src/Entity`         | Database user entity mapped with Doctrine.   |
| `Visit.php`              | `src/Entity`         | Database visit entity mapped with Doctrine.  |
| `UserRepository.php`     | `src/Repository`     |                                              |
| `VisitRepository.php`    | `src/Repository`     |                                              |
| -                        | `config`             | Configuration files for framework behavior.  |
---
### 10. Infrastructure and deployment
#### 10.1. Server and Network Layer
- Hosting: VPS (Hetzner).
- DNS & Proxy: Cloudflare (Proxy mode is used to hide the server’s real IP address and provide protection against DDoS attacks).
- Firewall: * UFW (Uncomplicated Firewall): Only ports 80 (HTTP), 443 (HTTPS), and 22 (SSH) are allowed.
- Fail2Ban: Active protection against SSH brute-force attacks.
- SSH Access: Direct login for the root user is disabled. Access is allowed only via a dedicated sysadmin account.

#### 10.2. Web Server and Routing
- Caddy is used as the web server and reverse proxy, configured in /etc/caddy/Caddyfile.
- [zoosino.org](https://zoosino.org/): Points to the frontend (React built on Vite).
- api.zoosino.org: A reverse proxy pointing to the backend API.
- Deployment: The code is located in the /www/var/zoosino directory (cloned Git repository).

#### 10.3. Application Stack
- Backend: PHP 8.4.
- Frontend: React + Vite.
- Database: MySQL running in an isolated Docker container.
- Configuration: The environment is set up for production (the .env file has been modified, and it’s connected to the production database).
- Tip for a classmate: If you’re writing the section on security, don’t forget to mention that thanks to Caddy, we have automatic SSL certificate management, which, combined with the Cloudflare proxy, creates a robust encrypted layer.
- Would you like me to go into more detail on any specific point (e.g., the Caddy configuration or Docker)?
---

### 11. Work records
| Team member | Activity                                          | Requirement | Time (hours) |
|:------------|:--------------------------------------------------|:------------|-------------:|
| M. Pop      | Implementation of ZOO theme                       | REQ-QUAL-01 |            5 |
| M. Pop      | Implementation of registration / login            | REQ-FUNC-06 |            2 |
| J. Čihař    | Implementation of registration / login            | REQ-FUNC-06 |            3 |
| M. Pop      | Implementation of starting a new game             | REQ-FUNC-01 |            2 |
| J. Čihař    | Implementation of saving game score               | REQ-FUNC-02 |            1 |
| M. Pop      | Implementation of displaying the leaderboard      | REQ-FUNC-03 |            2 |
| J. Čihař    | Implementation of sending data to the leaderboard | REQ-FUNC-03 |            1 |
| J. Čihař    | Implementation of traffic tracking                | REQ-FUNC-04 |            1 |
| F. Heger    | Deploying the web server                          | REQ-FUNC-05 |            2 |
[more here](https://docs.google.com/spreadsheets/d/1lTG6RwELVSDwi0qenLnRGyiBGwYZqYOdxpJOUNz5UFs/edit?gid=0#gid=0)
---

### 12. Balance sheet
| Item   | Price (CZK/month) |
|:-------|------------------:|
| Server |            146,38 |
| Domain |             13,33 |
| Total  |             15,71 |

| Role          | Hourly salary (CZK) | Number of hours | Price(CZK) |
|:--------------|--------------------:|----------------:|-----------:|
| Sysadmin      |                 250 |              25 |      7 500 |
| Backend       |                 300 |              14 |      3 500 |
| Designer      |                 300 |              46 |     13 800 |
| Documentarist |                 230 |              19 |      4 370 |
| SCRUM master  |                 230 |              18 |      4 140 |
| Total         |               1 310 |             122 |     33 310 |

- Total price: 33 325,71CZK
---

### 13. Testing
#### 13.1. Basic Load Measurement
*Testing conditions: Unthrottled, Cache disabled, User is logged in*

##### 13.1.1. Largest Assets
| File Name / Resource | Type              | Size (KB) | Load Time (ms) |
|:---------------------|:------------------|:----------|---------------:|
| `index-CLI9dOUl.js`  | JavaScript Bundle | 115 KB    |          46 ms |
| `main.js`            | JavaScript        | 14.4 KB   |          10 ms |
| `index-Bwey1mX3.css` | Stylesheet        | 8.1 KB    |          42 ms |

#### 13.2. Network Conditions & Slow Connection Simulation
*Testing conditions: Comparing Unthrottled network vs. Fast 3G Throttling, Home Page*

##### 13.2.1. Performance Comparison
| Metric                       | Unthrottled (No Limit)  | Fast 3G Throttling  |
|:-----------------------------|:------------------------|:--------------------|
| **Total Load Time**          | 135ms                   | 6.8s                |
| **Slowest Loading Elements** | API request: `/auth/me` | `index-CLl9dOUl.js` |

#### 13.3. Unused Code Analysis (Coverage)
*Testing conditions: DevTools Coverage tab, Home Page.*

##### 13.3.1 Code Utilization
| Resource Type  | Total Bytes Downloaded | Unused Bytes | % Unused | Worst Performing Files |
|:---------------|:-----------------------|:-------------|:---------|:-----------------------|
| **JavaScript** | 335 KB                 | 157 KB       | 47%      | `index-CLI9dOUl.js`    |
| **CSS**        | 39 KB                  | 4.9 KB       | 12.7%    | `index-Bwey1mX3.css`   |

**Observations:**
* **Why is the unused JS so high?** This is a very common scenario because the entire frontend is built as a **React Single Page Application (SPA)**. By default, the bundler packages the code for the *entire* website (including components, logic, and UI for other routes like dashboards or settings) into one main file (`index-CLI9dOUl.js`). When a user visits the homepage, almost half of the downloaded JavaScript is parsed but not actually executed, because it belongs to other pages.
* **CSS Performance:** The CSS is remarkably well-optimized, with only 12.7% unused code. This is a great metric and requires no immediate attention.

#### 13.4. Page Performance Analysis (Performance Monitor)
*Testing conditions: DevTools Performance Monitor, measuring idle state vs. user interaction (hovering over the game menu).*

##### 13.4.1. Resource Metrics
| Metric           | Idle State  | Hover Interaction (Game Menu) |
|:-----------------|:------------|:------------------------------|
| **CPU Usage**    | 0.2%        | Spikes up to ~25%             |
| **JS Heap Size** | 8.4 MB      | 8.7 MB                        |
| **DOM Nodes**    | 253         | 253                           |

**Observations:**
* **Idle State is Excellent:** When the page is not being interacted with, the CPU usage drops almost to zero (0.2%). This means there are no heavy background scripts, infinite loops, or unoptimized continuous animations draining the user's battery.
* **Lean DOM & Memory:** Having only 253 DOM nodes is incredibly efficient and guarantees fast styling and layout calculations. The memory footprint (8.4 MB) is also very well contained.
* **Animation CPU Spike:** Hovering over the game menu items triggers an enlargement animation that causes a notable CPU spike (up to 25%). This strongly indicates that the animation is forcing the browser to recalculate the layout on every frame on the main thread.

#### 13.5. No-JavaScript Functionality Test
*Testing conditions: JavaScript disabled via DevTools Command Menu.*

##### 13.5.1. Observations
* **Page Render Status:** The application fails to load entirely. The screen remains completely white and non-functional.
* **Content Visibility:** No content, navigation, or structure is visible. Since this is a purely client-side rendered React SPA, the HTML document is practically empty until the JavaScript bundle executes.
* **Fallback UI (`<noscript>`):** **Missing.** Users (or strict network environments) with JavaScript disabled or blocked receive no feedback as to why the page is blank.
**Actionable Steps:**
* **Add a `<noscript>` tag:** Insert a simple `<noscript>` block inside the `<body>` of the `index.html` file (e.g., *"Please enable JavaScript to play at Zoosino."*). This is a quick win that provides basic context instead of a broken-looking white screen.

#### 13.6. Lighthouse Analysis
*Testing conditions: DevTools Lighthouse (Mobile simulation, clear cache/storage).*

##### 13.6.1. Scores
| Category           | Score (0-100) | Status    |
|:-------------------|:--------------|:----------|
| **Performance**    | 90            | Excellent |
| **Accessibility**  | 97            | Excellent |
| **Best Practices** | 81            | Good      |
| **SEO**            | 92            | Excellent |

#### Key Issues & Relevant Suggestions
1. **Performance: Render-blocking requests (Est. savings: 300 ms)**
  * **Context:** Some resources (likely CSS or synchronous scripts in the `<head>`) are blocking the initial rendering of the page.
  * **Actionable Fix:** Ensure that only critical CSS is loaded synchronously. Non-critical stylesheets and scripts should be loaded with `defer` or `async` attributes.
2.  **Performance: Use efficient cache lifetimes (Est. savings: 111 KiB)**
  * **Context:** Static assets are not leveraging browser caching effectively, meaning returning users will re-download files unnecessarily.
  * **Actionable Fix:** Configure the server (or CDN/hosting provider) to set long `Cache-Control` headers (e.g., `max-age=31536000, immutable`) for static assets like bundled JS, CSS, and WebP images.
3. **Best Practices: Deprecated API usage**
  * **Context:** The Best Practices score is primarily lowered by a warning regarding the use of a deprecated API.
  * **Actionable Fix:** Investigate the console warnings to identify the exact deprecated API. This is usually caused by an outdated third-party library (NPM package) that needs to be updated to a newer version.

#### 13.7. Accessibility
*Testing conditions: Manual DOM inspection and keyboard/screen reader behavior analysis.*

##### 13.7.1. Observations
- **The Lighthouse Paradox:** Despite the automated Lighthouse Accessibility score of 97, manual inspection reveals that the application is practically unusable for visually impaired users relying on screen readers (like NVDA or VoiceOver).
- **Missing ARIA Attributes:** The React application heavily lacks WAI-ARIA implementations. Dynamic state changes (menus opening, modals appearing) are not announced to assistive technologies because attributes like `aria-expanded`, `aria-hidden`, or `aria-live` are missing.
- **Contextual Voids:** Essential visual elements lack context for screen readers.
**Actionable Steps:**
- **Implement Core ARIA:** Add `aria-label` to all icon-only buttons or ambiguous links. Ensure complex custom components explicitly state their `role` (e.g., `role="dialog"` or `role="menu"`).
- **Audit Alt Texts:** Ensure all `<img src="...webp">` tags (especially game covers like `sloth_game.webp`) have descriptive `alt` attributes (e.g., `alt="Play Sloth Casino Game"`), so visually impaired users know what they are interacting with.
---

### 14. Log data
- Unique visitors: 234
- Valid requests: 400 369
- Failed requests: 1 320
---

### 15. Evaluation
Zoosino is a functional prototype of a gaming platform with well-designed user account logic. The project successfully implements core features, including the management of virtual funds and leaderboards. A significant advantage is the barrier-free access system (Guest mode), which facilitates immediate testing of the application. The minimalist interface offers a stable technical foundation and clean code that can be effectively built upon.

#### 15.1. Known issues:
Vulnerability to automation: The application is currently susceptible to the use of automated tools and scripts. Since there is no game mechanic that allows points to be lost, a user can increase their balance indefinitely without risk.

#### 15.2. Opportunities for further development:
Game content offerings: Add new types of casino games
Expand gamification: Implement daily rewards, achievements, or more advanced player statistics to increase motivation and retention
Improve animations: Make games more dynamic and visually appealing for a better user experience
---

### 16. Attachments
- [GitHub repository](https://github.com/CommitToRisk/Zoosino)
- [Running app](https://zoosino.org/)
- [Screenshots](https://photos.google.com/share/AF1QipMkHFg7Tsvfzb48xk40syeXQ3aZr9C7-pZ4Db1JWdIcvnq7niK2hu-5aO2fAx7nCg?pli=1&key=alEybmxCaDBFOEpaeWlkdmp6Q2EyRTZmSnR1LVJB)
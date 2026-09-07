POS project scaffold

Backend (Express + Prisma):
- cd backend
- npm install
- copy ../.env.example to .env and set DATABASE_URL
- npx prisma migrate dev --name init
- npm run dev

Health check: GET http://localhost:3000/health
Products endpoints: GET /api/products

JavaFX frontend (run locally):
Prerequisite: Install a JDK 17+ (Temurin/Adoptium or other) and set JAVA_HOME.
1. Install JDK 17+: https://adoptium.net/
2. Set JAVA_HOME (Windows):
   - Open System Properties → Advanced → Environment Variables
   - New system variable JAVA_HOME = C:\\Program Files\\Eclipse Adoptium\\jdk-<version>
   - Add %JAVA_HOME%\\bin to PATH
3. Run the JavaFX app from project root:
   - run-javafx.bat
   or
   - mvn clean javafx:run

Notes:
- If no Java is installed on this machine, the CI environment cannot launch the GUI. A runnable package can be created with the javafx-maven-plugin once Java is available.

Next: replace the file-based fallback with a real database-backed Prisma implementation and implement auth and sales endpoints.

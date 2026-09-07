@echo off
REM Run JavaFX app via mvnw. Exits if JAVA_HOME missing.
if "%JAVA_HOME%"=="" (
  echo ERROR: JAVA_HOME not set. Install a JDK (e.g., Eclipse Temurin) and set JAVA_HOME to its install folder.
  echo Visit: https://adoptium.net/
  exit /b 1
)
"%~dp0\mvnw.cmd" clean javafx:run

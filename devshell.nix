
{pkgs}:
with pkgs;
# Configure your development environment.
#
# Documentation: https://github.com/numtide/devshell
  devshell.mkShell {
    name = "android-project";
    motd = ''
      Entered the Android app development environment.
    '';
    env = [
      {
        name = "ANDROID_HOME";
        value = "/home/sahilsway/Android/Sdk/";
      }
      {
        name = "ANDROID_SDK_ROOT";
        value = "/home/sahilsway/Android/Sdk/";
      }
      {
        name = "JAVA_HOME";
        value = jdk17.home; # Needed to set this to jdk11 for my project
      }
      {
        name = "GRADLE_OPTS";
        # Had to add 33.0.0 to match the build-tools-33-0-0 sdkPkg 
        # There should be a way to pass this from flake.nix but I don't know how yet
        value = "-Dorg.gradle.project.android.aapt2FromMavenOverride=/home/sahilsway/Android/Sdk/build-tools/34.0.0/aapt2";
      }
    ];
    packages = [
      android-studio
      android-sdk
      gradle
      jdk17 # Needed to set this to jdk11 for my project
    ];
  }


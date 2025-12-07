allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

// Aplicar plugins sin aplicarlos en el root
plugins {
    id("com.android.application") apply false
    id("com.android.library") apply false
    id("dev.flutter.flutter-gradle-plugin") apply false
    id("kotlin-android") apply false
}

// Configuración común para subproyectos Android
subprojects {
    afterEvaluate {
        if (plugins.hasPlugin("com.android.library")) {
            android {
                compileSdk = 35
            }
        }
    }
}

val newBuildDir: Directory =
    rootProject.layout.buildDirectory
        .dir("../../build")
        .get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.value(newSubprojectBuildDir)
}
subprojects {
    project.evaluationDependsOn(":app")
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}

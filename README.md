# GeoForce24x7
## Table of Contents
1. [What is GeoForce24x7?](Description)
2. [Tech Stacks](Techstacks)
3. [Features](Features)
4. [Installation](Installation)
5. [Purpose](Purpose)
6. [Contribution](Contribution)

## What is GeoForce24x7?
Private cameras in businesses, homes, and institutions play a crucial role in enhancing public safety and crime detection. Many private cameras lack clear locations, making it difficult for the police to efficiently access relevant video footage during investigations in specific crime-prone areas. GeoForce24x7 is a web application designed to allow police department to attach geographical metadata, or "geotags," to various types of content such as camera information, video footages, or notes. Geotagging enables cybersecurity department officials to organize, search, and visualize the criminal activities based on location, enhancing their overall experience in one place.
<html>
  <center>
    <div><img src="cctv.png" alt="Alt Text" width="100"></div>
  </center>
</html>

## Tech Stack
* [HTML](https://en.wikipedia.org/wiki/HTML),[CSS](https://www.w3.org/Style/CSS/Overview.en.html),[Javascript](https://www.w3schools.com/js/) - For building Frontends
* [Node.js](https://nodejs.org/en) - Framework for building servers (backend)
* [MySql](https://www.mysql.com/) - For Databases
* Liberaries : [Express](https://expressjs.com/) , node mailer, googleapis
* [Python](https://www.python.org/) : Primary Language for building the detection systems
* [Flask](https://flask.palletsprojects.com/)- Framework used for integration with backend apis to access the machine learning models(Yolo v8)

## Features
1. **<ins>Email Triggering :</ins>**  The application supports email triggering functionality whenever any crime happens in a particular locality, allowing the cyber department to immediately get notified about the crime and contact the owner of the cameras of that locality.
2. **<ins>Authentication :</ins>**
Secure user authentication system ensures that only authorized users (department officials) can access the application's features and data. Supports both traditional username/password authentication and social login options (e.g., OAuth).
3. **<ins>OTP Verification :</ins>**
Two-factor authentication (2FA) using one-time passwords (OTP) adds an extra layer of security to camera owner's accounts, by which they will be notified everytime when the police department wants to access the video recordings or footages. Only when the otp is given by camera owners to department, the officers will be able to access the footages.
4. **<ins>AI integrated Detection Systems :</ins>**<br>
<ins>*Weapon Detection*</ins> : The web application provides hands on functionality of live camera streaming which supports weapon detection system and whenever a weapon caughts in the camera , the email will be triggered to the department along with location and timings.</br>
<br><ins>*Object Detection*</ins> : Object detection model have been integrated with recorded videos for improving efficiency for officials to detect various kinds of objects for investigation process.</br>
5. **<ins>Geolocation Integration :</ins>** Integration with geolocation APIs allows users to automatically retrieve and assign location data to their content based on GPS coordinates or place names.
6. **<ins>Customizable Settings :</ins>** Users have the ability to customize various settings such as Calling functions and default map views.

## Installation

### 1. Clone this Repository
```
git clone https://github.com/gurusinghpal/RJPOLICE_HACK_1096_WhiteHatHackers_6.git
```
### 2. Install the requirements
```
pip install -r requirements.txt
```
### 3. Start all the servers
```
node authServer.js
node mapServer.js
```
### 4. Run the app.py file
```
python app.py
```
### 5. Start the index.html file
```
start index.html
```

## Purpose of GeoForce24X7
* Geo-tagging involves tagging cameras with precise location information.
* Geo-tagging aids police in crime investigations by providing a clear map-like location for private cameras, facilitating quick identification and access to crucial video footage with integration with machine learning models.
* Enhances law enforcement's ability to gather evidence, understand the context of a crime in a locality, and expedite case resolution for overall public safety.

## Contribution
Contributions to the Geotagging Project are welcome! If you would like to contribute, please follow these steps:

* Fork the repository.
* Create a new branch for your feature or bug fix.
* Make your changes and commit them with descriptive messages.
* Push your changes to your fork.
* Submit a pull request to the main repository.


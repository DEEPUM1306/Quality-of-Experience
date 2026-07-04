# QoE Network Traffic Analyzer

I made a web application that helps us see what is happening on our network in time. This application uses Flask. It can look at the packets that are going through our network. It can also look at files that we upload to it. The application then calculates some things about our network like how long it takes for things to get from one place to another and how good the quality of the experience is.

---

## Features

- We can upload files. The application will look at them

- The application can look at the packets that are going through our network in time

- It has a dashboard that shows us what is happening on our network

- It calculates things like:

How long it takes for things to get from one place to another

How much the delay changes

How much data is being sent

The QoE score, which is a number from 1 to 5 that tells us how good the quality of the experience is

- It shows us details about the packets like:

Where they are coming from

Where they are going to

What kind of protocol they are using

How big they are

- It tells us which IP address is sending the most packets

- The application is simple and easy to use and it works well on devices

---

## Technologies Used

- Python is the programming language I used

- Flask is the framework I used to make the web application

- Scapy is the library I used to look at the packets

- HTML is the language I used to make the web pages

- CSS is the language I used to make the web pages look good

- JavaScript is the language I used to make the web pages interactive

---

## Project Structure

```

QOE_Project/

│

├── app.py

├── templates/

│   └── index.html

├── static/

│   ├── css/

│   ├── js/

│   └── images/

├── requirements.txt

└── README.md

```

---

## Installation

### 1. Get the code from the internet

```bash

git clone https://github.com/yourusername/QOE_Project.git

```

### 2. Go to the project folder

```bash

cd QOE_Project

```

### 3. Get the packages we need

```bash

pip install -r requirements.txt

```

### 4. Start the application

```bash

python app.py

```

### 5. Open the application in our browser

```

http://127.0.0.1:5000

```

---

## QoE Calculation

The QoE Network Traffic Analyzer calculates the Quality of Experience using the QoE Network Traffic Analyzer. It looks at things like:

- How long it takes for things to get from one place to another

- How much the delay changes

- How much data is being sent

The final QoE score is a number from 1 to 5 where 1's poor and 5 is excellent.

---

## Application Functions

- We can start looking at packets in time

- We can stop looking at packets

- We can upload files

- We can look at information about the packets

- We can look at how long it takes for things to get from one place to another and how much the delay changes and how much data is being sent

- We can calculate the QoE score

- We can see which IP address is sending the most packets

---

## Future Improvements

- We can use machine learning to predict the Quality of Experience

- We can classify the traffic

- We can make interactive charts and graphs

- We can add user authentication

- We can store reports in a database

- We can export reports as PDF files

---

## Author

**Deepu M**

I studied Computer Science and Engineering.

---

## License

I made this project for research purposes. The QoE Network Traffic Analyzer is, for learning and research.

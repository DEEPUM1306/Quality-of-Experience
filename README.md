##Quality of Experience Network Traffic Analyzer

A web-based application I developed using Flask and Scapy to monitor and analyze network traffic in time. This system captures packets or processes uploaded PCAP files to evaluate network performance by calculating key Quality of Experience metrics such as Delay, Jitter, Throughput and QoE Score.

## Features

- It can capture network traffic.

- You can. Analyze PCAP files.

- The system calculates Delay, Jitter and Throughput.

- It computes a QoE Score on a scale of 1 to 5.

- The application displays source IP, destination IP, protocol and packet size.

- It identifies the active source IP.

- There's a user- web interface for network monitoring.

## 🛠️ Technologies Used

- Python

- Flask

- Scapy

- HTML

- CSS

- JavaScript

## Project Structure

```

QOE_Project/

│── app.py

│── templates/

│     └── index.html

│── static/

│     ├── css/

│     ├── js/

│     └── images/

── README.md

```

##  How to Run

1. First clone this repository:

```bash

git clone https://github.com/yourusername/QOE_Project.git

```

2. Then navigate to the project folder:

```bash

cd QOE_Project

```

3. Next run the application:

```bash

python app.py

```

4. Finally open your browser. Visit:

```

http://127.0.0.1:5000

```

##  QoE Metrics

The application uses the following metrics to evaluate network performance:

- **Delay** measures packet transmission time.

- **Jitter** measures variation in delay.

- **Throughput** calculates the rate of data transfer.

- **QoE Score** provides a quality rating on a scale of 1 (Poor) to 5 (Excellent).

##  Future Enhancements

Some ideas for enhancements include:

- Adding interactive graphs and charts.

- Using Machine Learning to predict QoE.

- Classifying traffic.

- Exporting analysis reports.

- Integrating a database.

- Adding user authentication.

##  Author

**Deepu M**

B.Tech Computer Science and Engineering

## License

This project is, for academic purposes only.

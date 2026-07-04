from flask import Flask, render_template, request, jsonify
from scapy.all import rdpcap, sniff
from scapy.layers.inet import IP, TCP, UDP
import tempfile, os, threading
from collections import Counter

app = Flask(__name__)

packets_data = []
capturing = False

# ---------------- HOME ---------------- #
@app.route("/")
def home():
    return render_template("index.html")

# ---------------- PACKET HANDLER ---------------- #
def packet_handler(pkt):
    global packets_data, capturing

    if not capturing:
        return

    try:
        if not pkt.haslayer(IP):
            return

        src = pkt[IP].src
        dst = pkt[IP].dst

        if pkt.haslayer(TCP):
            proto = "TCP"
        elif pkt.haslayer(UDP):
            proto = "UDP"
        else:
            proto = "OTHER"

        packets_data.append({
            "time": float(pkt.time),
            "src": src,
            "dst": dst,
            "protocol": proto,
            "size": len(pkt)
        })

        if len(packets_data) > 50:
            packets_data.pop(0)

    except Exception as e:
        print("Packet Error:", e)

# ---------------- SNIFF ---------------- #
def start_sniff():
    sniff(prn=packet_handler, store=False)

# ---------------- CONTROL ---------------- #
@app.route("/start", methods=["POST"])
def start():
    global capturing, packets_data

    packets_data = []
    capturing = True

    thread = threading.Thread(target=start_sniff)
    thread.daemon = True
    thread.start()

    return jsonify({"status": "started"})

@app.route("/stop", methods=["POST"])
def stop():
    global capturing
    capturing = False
    return jsonify({"status": "stopped"})

# ---------------- PCAP ---------------- #
@app.route("/upload", methods=["POST"])
def upload():
    global packets_data

    file = request.files.get("file")

    temp = tempfile.NamedTemporaryFile(delete=False)
    file.save(temp.name)

    pcap = rdpcap(temp.name)
    packets_data = []

    for pkt in pcap[:100]:
        try:
            src = pkt[IP].src if pkt.haslayer(IP) else "N/A"
            dst = pkt[IP].dst if pkt.haslayer(IP) else "N/A"

            packets_data.append({
                "time": float(pkt.time),
                "src": src,
                "dst": dst,
                "protocol": pkt.summary().split()[0],
                "size": len(pkt)
            })
        except:
            pass

    os.unlink(temp.name)

    return jsonify(generate_metrics())

# ---------------- METRICS ---------------- #
@app.route("/metrics")
def metrics():
    return jsonify(generate_metrics())

def generate_metrics():

    if len(packets_data) < 2:
        return {
            "delay": 0,
            "jitter": 0,
            "throughput": 0,
            "qoe": 0,
            "packets": packets_data,
            "top_ip": "N/A"
        }

    packets_data.sort(key=lambda x: x["time"])
    times = [p["time"] for p in packets_data]

    # Delay & Jitter
    delays = [times[i] - times[i-1] for i in range(1, len(times))]
    delays = [d for d in delays if 0 <= d <= 1]

    if not delays:
        delays = [0]

    delay = sum(delays[-5:]) / len(delays[-5:])
    jitter = max(delays[-5:]) - min(delays[-5:])

    ## Throughput (FIXED)
    total_bytes = sum(p["size"] for p in packets_data)

    duration = times[-1] - times[0]

    if duration > 0:
        throughput_kb = (total_bytes / duration) / 1024
    else:
        throughput_kb = 0

    # 🔥 QoE (Clean Model)
    delay_score = 1 if delay < 0.05 else max(0, 1 - delay * 3)
    jitter_score = max(0, 1 - jitter * 5)
    throughput_score = min(1, throughput_kb / 50)

    qoe = (
        0.4 * delay_score +
        0.4 * jitter_score +
        0.2 * throughput_score
    ) * 5

    qoe = round(max(1, min(5, qoe)), 2)

    # Top IP
    src_ips = [p["src"] for p in packets_data if p["src"] != "N/A"]
    top_ip = Counter(src_ips).most_common(1)[0][0] if src_ips else "N/A"

    return {
        "delay": round(delay, 4),
        "jitter": round(jitter, 4),
        "throughput": round(throughput_kb, 2),
        "qoe": qoe,
        "packets": packets_data,
        "top_ip": top_ip
    }

# ---------------- RUN ---------------- #
if __name__ == "__main__":
    app.run(debug=True)
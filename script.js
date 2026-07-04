function show(section){
    ["dashboard","packets","analysis"].forEach(id=>{
        document.getElementById(id).style.display="none";
    });
    document.getElementById(section).style.display="block";
}

function startCap(){
    fetch("/start",{method:"POST"});

    if(interval) return;

    interval=setInterval(()=>{
        fetch("/metrics")
        .then(r=>r.json())
        .then(update);
    },2000);
}

function stopCap(){
    fetch("/stop",{method:"POST"});
    clearInterval(interval);
    interval=null;
}
function upload(){
    let f=new FormData();
    f.append("file",document.getElementById("file").files[0]);
    fetch("/upload",{method:"POST",body:f})
    .then(r=>r.json()).then(update);
}

function badge(text,color){
    return `<span class="badge" style="background:${color}">${text}</span>`;
}

/* GRAPH FINAL FIX */
let t = new Date().toLocaleTimeString();

/* Safe values (avoid undefined / string issues) */
let delay = Number(d.delay) || 0;
let jitter = Number(d.jitter) || 0;
let throughput = Number(d.throughput) || 0;

/* QoE calculation */
let qoe = 5 - (delay * 1.5) - (jitter * 0.8) + (throughput / 500);
qoe = Math.max(1, Math.min(5, qoe));

/* Normalize jitter to same scale */
let jitterNorm = jitter / 5;
jitterNorm = Math.max(0, Math.min(5, jitterNorm));

/* Push data */
chart.data.labels.push(t);
chart.data.datasets[0].data.push(qoe);
chart.data.datasets[1].data.push(jitterNorm);

/* Limit points */
if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(ds => ds.data.shift());
}
const ctx = document.getElementById('qoeChart').getContext('2d');

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'QoE',
                data: [],
                borderColor: '#00ff88',
                tension: 0.4
            },
            {
                label: 'Delay (ms)',
                data: [],
                borderColor: '#ffb300',
                tension: 0.4
            },
            {
                label: 'Jitter (ms)',
                data: [],
                borderColor: '#00c3ff',
                tension: 0.4
            },
            {
                label: 'Throughput (KB/s)',
                data: [],
                borderColor: '#ff4d4d',
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
function blockIP(){

    let text = document.getElementById("topip").innerText;
    let ip = text.split(": ")[1];

    if(!ip || ip === "N/A"){
        alert("No IP to block");
        return;
    }

    fetch("/block_ip",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ip: ip})
    })
    .then(r=>r.json())
    .then(data=>{
        alert("🚫 Blocked IP: " + ip);

        // ✅ UPDATE BLOCKED LIST IMMEDIATELY
        if(data.blocked_ips){
            document.getElementById("blockedList").innerHTML =
                "<b>Blocked IPs:</b><br>" + data.blocked_ips.join("<br>");
        }
    });
}
if(d.blocked_ips){
    document.getElementById("blockedList").innerHTML =
        "<b>Blocked IPs:</b><br>" + d.blocked_ips.join("<br>");
}
// SUSPICIOUS IPS
if(d.suspicious_ips && d.suspicious_ips.length > 0){
    document.getElementById("suspicious").innerHTML =
        "⚠ Suspicious IPs:<br>" + d.suspicious_ips.join("<br>");
} else {
    document.getElementById("suspicious").innerHTML =
        "✅ No suspicious activity";
}

if(d.qoe >= 4)
    health = "<span style='color:lightgreen'>🟢 Excellent</span>";
else if(d.qoe >= 3)
    health = "<span style='color:yellow'>🟡 Good</span>";
else
    health = "<span style='color:red'>🔴 Poor</span>";

issues.push("<span style='color:red'>⚠ High Delay</span>");
chart=new Chart(ctx,{
    type:"line",
    data:{
        labels:[],
        datasets:[
            {
                label:"QoE",
                data:[],
                borderColor:"lime",
                backgroundColor:"rgba(0,255,0,0.2)",
                tension:0.4,
                fill:true
            },
            {
                label:"Jitter",
                data:[],
                borderColor:"orange",
                backgroundColor:"rgba(255,165,0,0.2)",
                tension:0.4,
                fill:true
            }
        ]
    },
    options:{
        responsive:true,
        plugins:{
            legend:{labels:{color:"white"}}
        },
        scales:{
            x:{ticks:{color:"white"}},
            y:{min:0,max:20,ticks:{color:"white"}}
        }
    }
});
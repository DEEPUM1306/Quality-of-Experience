.graph-container {
    width: 100%;
    max-width: 500px;
    margin-top: 20px;
}

.bar-row {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.bar-row span {
    width: 70px;
}

.bar-bg {
    width: 100%;
    height: 12px;
    background: #333;
    border-radius: 10px;
    overflow: hidden;
}

.bar {
    height: 100%;
    width: 0%;
    transition: 0.5s;
}
:root {
    --bg:#0b132b;
    --card:#1e293b;
    --text:#e5e7eb;
}

.light-mode {
    --bg:#f1f5f9;
    --card:#ffffff;
    --text:#111827;
}

body {
    background:var(--bg);
    color:var(--text);
}

.card, .analysis-box {
    background:var(--card);
}
y:{
    min:0,
    max:5,
    ticks:{
        color:"white",
        stepSize:1
    }
}
.insights-grid{
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    gap:15px;
}

.analysis-box{
    background:#1e293b;
    padding:15px;
    border-radius:10px;
}
.analysis-box:hover{
    transform:scale(1.02);
    transition:0.2s;
}
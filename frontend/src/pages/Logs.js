import React, { useEffect, useState } from "react";

function Logs() {
const [logs, setLogs] = useState([]);

// 🔥 Poll logs every 1 sec
useEffect(() => {
const interval = setInterval(() => {
fetch("https://compclean.onrender.com/logs")
.then(res => res.json())
.then(data => {
setLogs(data.logs);
})
.catch(err => console.error(err));
}, 1000);

```
return () => clearInterval(interval);
```

}, []);

// 🔥 Auto scroll
useEffect(() => {
const box = document.getElementById("logBox");
if (box) {
box.scrollTop = box.scrollHeight;
}
}, [logs]);

return (
<div style={{ padding: "20px" }}> <h2>Live Scraper Logs</h2>

```
  <div
    id="logBox"
    style={{
      background: "black",
      color: "lime",
      padding: "15px",
      height: "400px",
      overflowY: "scroll",
      fontFamily: "monospace",
      borderRadius: "10px"
    }}
  >
    {logs.length === 0 ? (
      <p>No logs yet...</p>
    ) : (
      logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))
    )}
  </div>
</div>
```

);
}

export default Logs;

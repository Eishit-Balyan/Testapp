import './style.css';

const app = document.querySelector('#app');
app.innerHTML = `
    <h1>AI Task Scheduler</h1>
    <textarea id="tasks" placeholder="Enter tasks, separated by commas"></textarea>
    <button id="generate">Generate Schedule</button>
    <pre id="output"></pre>
`;

document.querySelector('#generate').addEventListener('click', async () => {
    const tasks = document.querySelector('#tasks').value.split(',');
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate-schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks })
    });
    const data = await res.json();
    document.querySelector('#output').textContent = data.schedule;
});

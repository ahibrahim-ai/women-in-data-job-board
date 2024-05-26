document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    fetch('jobs.json')
        .then(response => response.json())
        .then(jobs => {
            const job = jobs[jobId];

            if (job) {
                document.getElementById('job-title').textContent = job.title;
                document.getElementById('job-company').textContent = `${job.company} - ${job.location}`;
                document.getElementById('job-type').textContent = job.type;
                document.getElementById('job-location').textContent = job.location;
                document.getElementById('job-description').innerHTML = job.description.replace(/\n/g, '<br>');

                const tags = job.tags ? job.tags.split(',').map(tag => {
                    const color = hashStringToColor(tag.trim());
                    return `<span class="tag" style="background-color: ${color};">${tag.trim()}</span>`;
                }).join('') : '';

                document.getElementById('job-tags').innerHTML = tags;
            } else {
                document.body.innerHTML = '<p>Job not found.</p><a href="index.html">Back to Job Board</a>';
            }
        })
        .catch(error => console.error('Error fetching job details:', error));

    // Hash function to assign a consistent color to each tag
    function hashStringToColor(str) {
        const colors = ['#ffc09f', '#809bce', '#e8dff5', '#fb6f92', '#84dcc6', '#dfb2f4'];
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }
});
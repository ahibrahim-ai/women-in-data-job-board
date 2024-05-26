document.addEventListener('DOMContentLoaded', () => {
    fetch('jobs.json')
        .then(response => response.json())
        .then(jobs => {
            const jobListings = document.querySelector('.job-listings');

            // Clear existing content
            jobListings.innerHTML = '';

            const colors = ['#BF0000', '#FF0000', '#E32227', '#F19396', '#FF4433', '#FFECEB'];

            // Hash function to assign a consistent color to each tag
            function hashStringToColor(str) {
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash);
                }
                return colors[Math.abs(hash) % colors.length];
            }

            jobs.forEach((job, index) => {
                const jobCard = document.createElement('div');
                jobCard.classList.add('job-card');

                const shortDescription = job.description.length > 150 
                    ? job.description.substring(0, 0) + '...'
                    : job.description;

                const tags = job.tags ? job.tags.split(',').map(tag => {
                    const color = hashStringToColor(tag.trim());
                    return `<span class="tag" style="background-color: ${color};">${tag.trim()}</span>`;
                }).join('') : '';

                jobCard.innerHTML = `
                    <a href="job-detail.html?id=${index}">
                        <h2>${job.title}</h2>
                        <h3>${job.company} - ${job.city}, ${job.country}</h3>
                        <p><strong>Type:</strong> ${job.type}</p>
                        <p>${shortDescription.replace(/\n/g, '<br>')}</p>
                        <div class="tags">
                            ${tags}
                        </div>
                    </a>
                `;

                jobListings.appendChild(jobCard);
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
});

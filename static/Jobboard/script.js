document.addEventListener('DOMContentLoaded', () => {
    fetch('jobs.json')
        .then(response => response.json())
        .then(jobs => {
            const jobListings = document.querySelector('.job-listings');

            // Clear existing content
            jobListings.innerHTML = '';

            jobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.classList.add('job-card');

                // Truncate description to 150 characters
                const shortDescription = job.description.length > 150 
                    ? job.description.substring(0, 150) + '...'
                    : job.description;

                const tags = job.tags ? job.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('') : '';

                jobCard.innerHTML = `
                    <h2>${job.title}</h2>
                    <h3>${job.company} - ${job.city}, ${job.country}</h3>
                    <p><strong>Type:</strong> ${job.type}</p>
                    <p>${shortDescription.replace(/\n/g, '<br>')}</p>
                    <div class="tags">
                        ${tags}
                    </div>
                `;

                jobListings.appendChild(jobCard);
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
});

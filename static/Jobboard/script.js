document.addEventListener('DOMContentLoaded', () => {
    let jobsData = [];

    fetch('jobs.json')
        .then(response => response.json())
        .then(jobs => {
            jobsData = jobs; // Save the jobs data
            populateFilters(jobs);
            displayJobs(jobs);
        })
        .catch(error => console.error('Error fetching jobs:', error));

    // Populate filter dropdowns
    function populateFilters(jobs) {
        const cityFilter = document.getElementById('city-filter');
        const countryFilter = document.getElementById('country-filter');

        const cities = [...new Set(jobs.map(job => job.city))];
        const countries = [...new Set(jobs.map(job => job.country))];

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityFilter.appendChild(option);
        });

        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countryFilter.appendChild(option);
        });
    }

    // Display jobs based on the provided job data
    function displayJobs(jobs) {
        const jobListings = document.querySelector('.job-listings');

        // Clear existing content
        jobListings.innerHTML = '';

        const colors = ['#ffc09f', '#809bce', '#e8dff5', '#fb6f92', '#84dcc6', '#dfb2f4'];

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
                ? job.description.substring(0, 150) + '...'
                : job.description;

            const tags = job.tags ? job.tags.split(',').map(tag => {
                const color = hashStringToColor(tag.trim());
                return `<span class="tag" style="background-color: ${color};">${tag.trim()}</span>`;
            }).join('') : '';

            jobCard.innerHTML = `
                <a href="job-detail.html?id=${index}" class="job-link">
                    <i class="fas fa-briefcase"></i>  <!-- Font Awesome Icon -->
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
    }

    // Apply filters
    document.getElementById('apply-filters').addEventListener('click', () => {
        const city = document.getElementById('city-filter').value;
        const country = document.getElementById('country-filter').value;
        const type = document.getElementById('type-filter').value;

        const filteredJobs = jobsData.filter(job => {
            return (city === '' || job.city === city) &&
                   (country === '' || job.country === country) &&
                   (type === '' || job.type === type);
        });

        displayJobs(filteredJobs);
    });
});

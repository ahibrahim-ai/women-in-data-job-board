import requests
from bs4 import BeautifulSoup
import json

# URL of the webpage to scrape
url = 'http://womenindata.co.uk/diverse-data-jobs/'

# Send a GET request to the webpage
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find job postings (this will vary depending on the structure of the webpage)
job_posts = soup.find_all('div', class_='job-posting')

# Extract job details
jobs = []
for post in job_posts:
    title = post.find('h2').text.strip()
    company = post.find('h3').text.strip()
    location = post.find('span', class_='location').text.strip()
    job_type = post.find('span', class_='job-type').text.strip()
    description = post.find('div', class_='description').text.strip()
    tags = [tag.text.strip() for tag in post.find_all('span', class_='tag')]

    jobs.append({
        'title': title,
        'company': company,
        'location': location,
        'type': job_type,
        'description': description,
        'tags': ', '.join(tags)
    })

# Save the job details to a JSON file
with open('jobs.json', 'w') as f:
    json.dump(jobs, f, indent=4)

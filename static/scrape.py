import requests
from bs4 import BeautifulSoup
import pandas as pd

def get_job_listings(url):
    job_listings = []
    page = 1

    while True:
        response = requests.get(url, params={'page': page})
        soup = BeautifulSoup(response.content, 'html.parser')
        
        job_cards = soup.find_all('div', class_='job-card')
        if not job_cards:
            break
        
        for job_card in job_cards:
            title = job_card.find('h2').text.strip()
            location = job_card.find('div', class_='location').text.strip()
            salary = job_card.find('div', class_='salary').text.strip()
            job_type = job_card.find('div', class_='type').text.strip()
            category = job_card.find('div', class_='category').text.strip()
            description = job_card.find('div', class_='description').text.strip()
            
            job_listings.append({
                'Title': title,
                'Location': location,
                'Salary': salary,
                'Type': job_type,
                'Category': category,
                'Description': description
            })
        
        page += 1

    return job_listings

# URL of the job search page
url = 'https://harnham.com/job-search'

# Scrape the job listings
job_listings = get_job_listings(url)

# Convert to DataFrame
df = pd.DataFrame(job_listings)

# Display the DataFrame
print(df)

# Save to CSV if needed
df.to_csv('harnham_job_listings.csv', index=False)

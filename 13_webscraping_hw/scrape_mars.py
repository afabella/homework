#!/usr/bin/env python
# coding: utf-8

# In[1]:


#dependents 
import pandas as pd 
import pymongo
from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser


# # NASA Mars News

# In[2]:


#URL of pages to be scraped 
url = 'https://mars.nasa.gov/news/'


# In[3]:


#Retrieve page with requests module
response = requests.get(url)
#Create BeautifulSoup object; parse with 'html.parser'
nasa_soup = bs(response.text, 'html.parser')
print(nasa_soup.prettify())


# In[4]:


#find title of latest article
latest_title = nasa_soup.find('div', class_='content_title')
latest_title.text.strip()


# In[5]:


#find the paragraph of latest article
latest_paragraph = nasa_soup.find('div', class_="rollover_description")
news_p = latest_paragraph.text.strip()
news_p


# # JPL Mars Space Images - Featured Image

# In[6]:


#URL of page to be scrapped 
image_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'


# In[7]:


response = requests.get(image_url)
image_soup = bs(response.text, 'html.parser')
print(image_soup.prettify())


# In[8]:


#find location of featured image 
featured = image_soup.find_all('a', class_='button fancybox')
featured


# In[9]:


#save URL as a variable
for feature in featured:
    featured_image_url = "https://www.jpl.nasa.gov" + feature['data-fancybox-href']
featured_image_url


# # Mars Weather

# In[10]:


#URL of page to be scrapped
weather_url = 'https://twitter.com/marswxreport?lang=en'


# In[11]:


response = requests.get(weather_url)
weather_soup = bs(response.text, 'html.parser')
print(weather_soup.prettify())


# In[12]:


# Save latest tweet as a variable
tweet = weather_soup.find('p',class_='TweetTextSize')
mars_weather = tweet.text
mars_weather.replace('\n', '')
mars_weather.replace('pic.twitter.com/NPmuRAuvQ7', '')


# # Mars Facts

# In[13]:


#URL of page to be scrapped
facts_url = 'https://space-facts.com/mars/'


# In[14]:



tables = pd.read_html(facts_url)
tables


# In[15]:


#change the header names of columns
df=tables[0]
df


# In[16]:


#convert to HTML
html_table = df.to_html()
html_table.replace('\n', '')


# In[17]:


# df.to_html('table.html')


# # Mars Hemispheres

# In[18]:


#Website to scrape
moon_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
response = requests.get(moon_url)
moon_soup = bs(response.text, 'html.parser')
print(moon_soup.prettify())


# In[32]:


#find hemisphere information 
hemispheres= moon_soup.find_all('div', class_='item')
print(hemispheres)


# In[43]:


hemisphere_image_url = []

#loop hemisphere information
for item in hemispheres: 
    #scrape titles of hemipsheres
    title = item.find('h3').text
    #scrape full-size hemisphere image urls
    hemisphere = moon_soup.find('a',class_='itemLink product-item')['href']
    hemisphere_url = ('https://astrogeology.usgs.gov'+ hemisphere)
    response = requests.get(hemisphere_url)
    image_soup = bs(response.text, 'html.parser')
    
    # scrape images from the hemisphere mage URLs
    img_url = 'https://astrogeology.usgs.gov' + image_soup.find('img', class_='wide-image')['src']
    
    # Append the retreived information into a list of dictionaries 
    hemisphere_image_url.append({"title" : title, "img_url" : img_url})
    
    


# In[44]:


hemisphere_image_url


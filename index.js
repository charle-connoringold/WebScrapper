const puppeteer = require('puppeteer');
const fs = require('fs/promises');

const baseURL = "https://bart.co.uk/recipe/"
const settings = require('./urls.json')
const UrlArray = settings.urls.length
const ScrappedData = []

console.log() // ['nodejs', 'javascript']


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // FOR LOOP

  await page.goto('https://bart.co.uk/recipe/spring-veg-pasta-primavera');

  const prep_time = await page.evaluate(() => {
    
    const ScrapedData = {
      product_title: document.querySelectorAll('.title').innerText,
      cuisine: document.querySelector('.col-lg-4 > table:nth-child(20) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)').innerText,
      season: document.querySelector('.col-lg-4 > table:nth-child(20) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)').innerText,
      ingredients: document.querySelector('.col-lg-4 > table:nth-child(20) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)').innerText,
      courses: document.querySelector('.col-lg-4 > table:nth-child(20) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2)').innerText,
      serves: document.querySelector('.col-lg-4 > table:nth-child(20) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(2)').innerText,
      cook_time: document.querySelector('.col-lg-4 > table:nth-child(20) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(2)').innerText,
      prep_time: document.querySelector('.col-lg-4 > table:nth-child(20) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(2)').innerText,
    }

    return JSON.stringify(ScrapedData)

  });

  console.log(prep_time);

  await fs.writeFile('index.json', await prep_time);

  await browser.close();
})();
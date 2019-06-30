const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports.getProduct = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(html);
    let name = $('.page-title').text().trim();
    let description = $('.product-info__description').text().trim();
    let images = $('.fotorama__loaded--img');
    let imageUrl = [];
    for (let i = 0; i < images.length; i++) {
        let href = images[i].attribs.href;
        if (href) imageUrl.push(href);
    }
    let priceBox = $('.price-box.price-final_price');
    let productId = priceBox[0].attribs['data-product-id'];
    let priceTag = $(`#product-price-${productId}`);
    let price = priceTag[0].attribs['data-price-amount'];

    await browser.close();
    return { url, name, description, imageUrl, price };
}
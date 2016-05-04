import request from 'request'
import fs 		 from 'fs'
import cheerio from 'cheerio'
import path    from 'path'
import chalk from 'chalk'
import { updateFile, diff } from '../../../scripts/helpers.js'

export default async function updateMediumData() {
  let freshData = await scrapeMedium('fasthacks')
  let liveData = require(path.resolve(__dirname, './data.json'))

  // if there's a difference between the data live on the site now and the data just scraped from medium
  if (diff(liveData, freshData)) {
    // update the live data
    await updateFile('./src/apis/scrape-medium/data.json', freshData)
    console.log(chalk.green('Medium has been updated!'));
    // restart the server to show changes (stop the server, pm2 will start it back up)
    process.exit(1)
  }
}

function scrapeMedium(username) {
  let mediumUrl = `https://medium.com/@${username}/latest?count=1000`
	return new Promise((accept, reject) => {
		request(mediumUrl, (error, response, html) => {
	    if(!error){
        let $ = cheerio.load(html);
        let posts = []

        let mediumPostsHtml = $('.blockGroup-list').children()

        mediumPostsHtml.each((i, el) => {
        	let data = {}
       		data.date = $('span.postMetaInline').eq(i).children().first().text()
       		data.url = $('article').eq(i).children().first().attr('href') //$('span.postMetaInline').eq(i).children().first().attr('href')
       		data.title = $('.section-inner').eq(i).children().get(0).tagName === 'figure' ?
       			$('.section-inner').eq(i).children().first().next().text() // for publications
       			: $('.section-inner').eq(i).children().first().text()      // for regular posts
       		data.image = $('.graf-image').eq(i).attr('src')
       		data.content = $('.section-inner').eq(i).children().last().text()
          data.likes = parseInt($('.button--chromeless[data-action=show-recommends]').eq(i).text()) // || 0
          data.name = $('.hero-title').children().text()
          data.username = username
       		posts.push(data)
        })
        accept(posts)
	    }
		})
	})
}

